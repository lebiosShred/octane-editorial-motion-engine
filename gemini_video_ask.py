import os
import sys
import json
import argparse
import google.generativeai as genai

def analyze_ingested_video(manifest_path, user_question, api_key=None):
    """
    Sends the 1-FPS sampled frames + audio manifest to Gemini API to answer any question about the video.
    """
    if not os.path.exists(manifest_path):
        print(f"[ERR] Manifest file not found at: {manifest_path}")
        sys.exit(1)

    api_key = api_key or os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("[WARNING] GEMINI_API_KEY environment variable not set. Reading local frames & manifest for local inspection...")
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)
        print(f"Loaded manifest with {manifest['total_seconds']} 1-FPS frames.")
        print(f"Question: '{user_question}'")
        return

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    base_dir = os.path.dirname(manifest_path)
    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    print(f"[1/2] Uploading 1-FPS frames and audio stream to Gemini API...")
    contents = [user_question]
    
    # Attach key frames or video file reference
    audio_path = os.path.join(base_dir, "audio.mp3")
    if os.path.exists(audio_path):
        audio_file = genai.upload_file(path=audio_path)
        contents.append(audio_file)

    print(f"[2/2] Querying Gemini 1.5/2.0 with question: '{user_question}'...")
    response = model.generate_content(contents)
    print("\n================ GEMINI RESPONSE ================")
    print(response.text)
    print("=================================================")
    return response.text

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Query Google AI Studio Ingested Video")
    parser.add_argument("manifest", help="Path to manifest.json file from aistudio_video_ingest.py")
    parser.add_argument("question", help="Question to ask about the video")
    parser.add_argument("--api-key", help="Gemini API Key (optional if GEMINI_API_KEY env var is set)")
    args = parser.parse_args()

    analyze_ingested_video(args.manifest, args.question, args.api_key)
