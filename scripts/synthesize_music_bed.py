import os
import numpy as np
import wave

os.makedirs('public/music', exist_ok=True)
SAMPLE_RATE = 48000
BPM = 120
BEAT_DUR = 60.0 / BPM  # 0.5s per beat
TOTAL_DUR = 58.0  # 58 seconds duration
TOTAL_SAMPLES = int(SAMPLE_RATE * TOTAL_DUR)

t = np.linspace(0, TOTAL_DUR, TOTAL_SAMPLES, endpoint=False)
music_track = np.zeros(TOTAL_SAMPLES)

# 1. Warm Sub-Bass Pulse (Quarter note pulse on 55Hz - A1 / 41.2Hz - E1)
bass_pulse = np.zeros(TOTAL_SAMPLES)
for beat_idx in range(int(TOTAL_DUR / BEAT_DUR)):
    start_sample = int(beat_idx * BEAT_DUR * SAMPLE_RATE)
    end_sample = min(TOTAL_SAMPLES, start_sample + int(BEAT_DUR * SAMPLE_RATE))
    beat_t = t[start_sample:end_sample] - (beat_idx * BEAT_DUR)
    
    # Root chord progression (A -> F -> D -> E)
    bar_idx = beat_idx // 16
    chord_freq = 55.0 if (bar_idx % 4 == 0) else (43.65 if (bar_idx % 4 == 1) else (36.7 if (bar_idx % 4 == 2) else 41.2))
    
    # Kick/Bass transient + envelope
    env = np.exp(-beat_t * 5.0)
    sine_wave = np.sin(2 * np.pi * chord_freq * beat_t)
    sub_wave = np.sin(2 * np.pi * (chord_freq / 2) * beat_t) * 0.4
    bass_pulse[start_sample:end_sample] += (sine_wave + sub_wave) * env

# 2. 16th-Note Electronic Arpeggio (Syncopated tech synth)
arp_track = np.zeros(TOTAL_SAMPLES)
arp_dur = BEAT_DUR / 4.0  # 0.125s per 16th note
scale_freqs = [220.0, 261.63, 329.63, 392.0, 440.0, 523.25, 659.25]  # A minor pentatonic / Aeolian

for step_idx in range(int(TOTAL_DUR / arp_dur)):
    start_sample = int(step_idx * arp_dur * SAMPLE_RATE)
    end_sample = min(TOTAL_SAMPLES, start_sample + int(arp_dur * SAMPLE_RATE))
    step_t = t[start_sample:end_sample] - (step_idx * arp_dur)
    
    freq = scale_freqs[(step_idx * 3 + (step_idx // 8)) % len(scale_freqs)]
    env = np.exp(-step_t * 22.0)
    
    # Pluck tone with subtle harmonics
    tone = np.sin(2 * np.pi * freq * step_t) + 0.3 * np.sin(2 * np.pi * freq * 2 * step_t)
    arp_track[start_sample:end_sample] += tone * env

# 3. Soft Ambient Pad Sweep (Stereo wide feeling)
pad_track = np.zeros(TOTAL_SAMPLES)
for freq in [110.0, 164.81, 220.0, 329.63]:
    lfo = 0.5 + 0.5 * np.sin(2 * np.pi * 0.15 * t)
    pad_track += np.sin(2 * np.pi * freq * t) * lfo * 0.15

# Mix and master tracks
music_track = bass_pulse * 0.45 + arp_track * 0.25 + pad_track * 0.2

# Global crescendo envelope towards climax (f2994)
climax_env = np.ones(TOTAL_SAMPLES)
climax_start = int(48.0 * SAMPLE_RATE)
climax_env[climax_start:] = np.linspace(1.0, 1.4, TOTAL_SAMPLES - climax_start)
music_track = music_track * climax_env

# Normalize to -1.0 to 1.0
max_val = np.max(np.abs(music_track))
if max_val > 0:
    music_track = music_track / max_val * 0.85

int_samples = np.int16(music_track * 32767)
filepath = 'public/music/tech_pulse_ambient.wav'
with wave.open(filepath, 'w') as wav_file:
    wav_file.setnchannels(1)  # Mono
    wav_file.setsampwidth(2)  # 16-bit
    wav_file.setframerate(SAMPLE_RATE)
    wav_file.writeframes(int_samples.tobytes())

print(f"Generated professional broadcast music bed: {filepath} ({TOTAL_DUR}s)")
