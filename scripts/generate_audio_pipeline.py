import os
import json
import torch
import soundfile as sf
from kokoro import KPipeline
from faster_whisper import WhisperModel

def generate_voiceover(text, out_wav="public/voiceover.wav", out_json="public/voiceover.json", voice="am_michael", speed=1.05):
    print(f"🎙️ Synthesizing voiceover with Kokoro TTS ({voice})...")
    pipeline = KPipeline(lang_code='a')
    generator = pipeline(text, voice=voice, speed=speed, split_pattern=r'\n+')
    
    audio_segments = []
    for i, (gs, ps, audio) in enumerate(generator):
        audio_segments.append(audio)
        
    full_audio = torch.cat(audio_segments, dim=0).numpy()
    sf.write(out_wav, full_audio, 24000)
    print(f"✅ Saved lossless master audio to {out_wav}")
    
    print("⏱️ Extracting millisecond word timestamps with Faster-Whisper...")
    model = WhisperModel("base.en", device="cuda" if torch.cuda.is_available() else "cpu", compute_type="float16")
    segments, info = model.transcribe(out_wav, word_timestamps=True)
    
    words = []
    for segment in segments:
        for word in segment.words:
            words.append({
                "word": word.word.strip(),
                "start": round(word.start, 2),
                "end": round(word.end, 2),
                "score": round(word.probability, 2)
            })
            
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump({"text": text, "duration": round(info.duration, 2), "words": words}, f, indent=2)
        
    print(f"✅ Extracted {len(words)} word timestamps to {out_json}")

if __name__ == "__main__":
    script = (
        "When your TM1 dashboard takes 40 seconds to open, your infrastructure team will always tell you to add more RAM. "
        "They are wrong. The bottleneck is overfeeding, forcing your engine to calculate millions of empty cells as if they were live transactions. "
        "Targeted conditional feeders cut calculation bloat from 48 gigabytes down to 6, and restore sub-second calculation in minutes. "
        "Audit your cube's feeder ratio in 10 minutes with our diagnostic playbook."
    )
    generate_voiceover(script)
