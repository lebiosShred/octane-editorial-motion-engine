import os
import numpy as np
import wave
import struct

os.makedirs('public/sfx', exist_ok=True)
SAMPLE_RATE = 48000

def save_wav(filename, samples):
    filepath = os.path.join('public/sfx', filename)
    # Normalize to -1.0 to 1.0 range
    max_val = np.max(np.abs(samples))
    if max_val > 0:
        samples = samples / max_val * 0.95
    # Convert to 16-bit PCM
    int_samples = np.int16(samples * 32767)
    with wave.open(filepath, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(SAMPLE_RATE)
        wav_file.writeframes(int_samples.tobytes())
    print(f"Generated {filepath} ({len(samples)/SAMPLE_RATE:.2f}s)")

# 1. Sub-Bass Drop (f0 | 0.0s)
def gen_sub_bass():
    duration = 1.2
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    freq = np.linspace(90, 35, len(t))
    env = np.exp(-t * 3.5)
    samples = np.sin(2 * np.pi * freq * t) * env
    save_wav('sfx_bass_drop.wav', samples)

# 2. Whoosh Dolly (f198 | 3.3s)
def gen_whoosh():
    duration = 0.8
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    noise = np.random.uniform(-1, 1, len(t))
    # Smooth bandpass filter effect via envelope
    env = np.sin(np.pi * (t / duration)) ** 2
    freq = np.linspace(200, 800, len(t))
    tone = np.sin(2 * np.pi * freq * t) * 0.3
    samples = (noise * 0.7 + tone) * env
    save_wav('sfx_whoosh_dolly.wav', samples)

# 3. Error Spark / Glitch (f606, f768 | 10.1s, 12.8s)
def gen_glitch_break():
    duration = 0.6
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    noise = np.random.uniform(-1, 1, len(t))
    # Rapid digital stutter envelope
    stutter = (np.sin(2 * np.pi * 30 * t) > 0).astype(float)
    env = np.exp(-t * 6.0)
    sine_zap = np.sin(2 * np.pi * 1200 * t) * 0.4
    samples = (noise * 0.6 + sine_zap) * stutter * env
    save_wav('sfx_glitch_break.wav', samples)

# 4. Watsonx Core Ascend Riser (f930 | 15.5s)
def gen_core_ascend():
    duration = 1.5
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    freq = np.linspace(150, 600, len(t))
    harmonics = np.sin(2 * np.pi * freq * t) + 0.5 * np.sin(2 * np.pi * freq * 2 * t)
    env = (t / duration) ** 1.5 * np.exp(-(t - duration)**2 / 0.1)
    samples = harmonics * env
    save_wav('sfx_core_ascend.wav', samples)

# 5. Socket Elevation (f1458 | 24.3s)
def gen_socket_rise():
    duration = 0.5
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    freq = np.linspace(300, 700, len(t))
    env = np.sin(np.pi * (t / duration)) ** 1.5
    samples = np.sin(2 * np.pi * freq * t) * env
    save_wav('sfx_socket_rise.wav', samples)

# 6. Laser Data Stream (f1860 | 31.0s)
def gen_laser_stream():
    duration = 0.7
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    freq = np.linspace(1800, 600, len(t))
    env = np.exp(-t * 5.0)
    samples = np.sin(2 * np.pi * freq * t) * env
    save_wav('sfx_laser_stream.wav', samples)

# 7. Tactile Switch Click (f2610 | 43.5s)
def gen_switch_click():
    duration = 0.25
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    # Sharp mechanical transient click
    click1 = np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 80.0)
    click2 = np.sin(2 * np.pi * 800 * t) * np.exp(-t * 40.0)
    samples = click1 * 0.8 + click2 * 0.6
    save_wav('sfx_switch_click.wav', samples)

# 8. Hero Impact Slam (f2994 | 49.9s)
def gen_hero_impact():
    duration = 1.4
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    # High punch transient + deep sub rumble
    transient = np.random.uniform(-1, 1, len(t)) * np.exp(-t * 50.0)
    sub = np.sin(2 * np.pi * 45 * t) * np.exp(-t * 3.0)
    body = np.sin(2 * np.pi * 90 * t) * np.exp(-t * 6.0)
    samples = transient * 0.6 + sub * 0.9 + body * 0.4
    save_wav('sfx_hero_impact.wav', samples)

if __name__ == '__main__':
    gen_sub_bass()
    gen_whoosh()
    gen_glitch_break()
    gen_core_ascend()
    gen_socket_rise()
    gen_laser_stream()
    gen_switch_click()
    gen_hero_impact()
    print("All audio foley sound effects synthesized successfully!")
