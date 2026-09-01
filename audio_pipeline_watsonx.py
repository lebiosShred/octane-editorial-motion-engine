import os
import sys
import subprocess
import numpy as np
import soundfile as sf

# The IBM watsonx Orchestrate Voiceover Script
TEXT_SCRIPT = (
    "Most enterprise AI projects stall for one boring reason: connecting a language model to legacy software "
    "takes six months of custom engineering. Every integration requires custom API glue code, brittle authentication "
    "handoffs, and manual error routines. When an endpoint changes, the entire pipeline breaks. IBM solved this with the "
    "new watsonx Orchestrate Agent Catalog. It provides a central, governed marketplace with over 150 pre-built enterprise "
    "agents and connectors for SAP, Salesforce, ServiceNow, and Workday. Instead of writing API wrappers from scratch, "
    "you select a pre-verified agent template. It connects securely using Model Context Protocol and executes cross-system "
    "handoffs with deterministic business rules and human approval checkpoints. If an order delays in SAP, the agent flags "
    "the issue and drafts a ticket in ServiceNow for one-click manager signoff. Every step is logged in OpenTelemetry "
    "dashboards, giving IT complete visibility. Stop building custom connectors from scratch. Deploy production agents in days, not months."
)

VOICE = "am_puck"
OUTPUT_WAV = "public/voiceover.wav"
OUTPUT_JSON = "public/voiceover.json"
OUTPUT_DIR = "public"

def main():
    os.makedirs("public", exist_ok=True)
    print(f"🎙️ Loading Kokoro TTS pipeline with voice {VOICE}...")
    
    try:
        from kokoro import KPipeline
        pipeline = KPipeline(lang_code='a')
        generator = pipeline(TEXT_SCRIPT, voice=VOICE, speed=1.12, split_pattern=r'\n+')
        
        audio_chunks = []
        sample_rate = 24000
        
        for i, (gs, ps, audio) in enumerate(generator):
            audio_chunks.append(audio)
            
        if audio_chunks:
            final_audio = np.concatenate(audio_chunks)
            sf.write(OUTPUT_WAV, final_audio, sample_rate)
            print(f"✅ Audio generated successfully at {OUTPUT_WAV} ({len(final_audio)/sample_rate:.2f}s)")
    except Exception as e:
        print(f"⚠️ Kokoro TTS warning/fallback: {e}")
        # If kokoro fails or needs onnx fallback, synthesize or handle cleanly
        if not os.path.exists(OUTPUT_WAV):
            print("Trying kokoro-onnx fallback...")
            try:
                import kokoro_onnx
                print("kokoro_onnx available")
            except Exception as e2:
                print(f"Error loading kokoro_onnx: {e2}")

    if os.path.exists(OUTPUT_WAV):
        print("⏳ Running WhisperX to extract word-level timestamps...")
        try:
            subprocess.run([
                sys.executable, "-m", "whisperx",
                OUTPUT_WAV,
                "--model", "base",
                "--output_dir", OUTPUT_DIR,
                "--output_format", "json"
            ], check=True)
            print(f"🚀 WhisperX complete! Timestamps at {OUTPUT_JSON}")
        except Exception as e:
            print(f"❌ WhisperX error: {e}")
            # Try faster-whisper direct fallback
            try:
                from faster_whisper import WhisperModel
                import json
                print("Running faster-whisper fallback for word timestamps...")
                model = WhisperModel("base", device="cpu", compute_type="int8")
                segments, info = model.transcribe(OUTPUT_WAV, word_timestamps=True)
                words_data = []
                for segment in segments:
                    for w in segment.words:
                        words_data.append({
                            "word": w.word.strip(),
                            "start": round(w.start, 3),
                            "end": round(w.end, 3),
                            "score": round(w.probability, 3)
                        })
                with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
                    json.dump({"word_segments": words_data, "language": "en"}, f, indent=2)
                print(f"✅ Fallback timestamps saved to {OUTPUT_JSON} ({len(words_data)} words)")
            except Exception as e3:
                print(f"❌ Fallback failed: {e3}")

if __name__ == "__main__":
    main()
