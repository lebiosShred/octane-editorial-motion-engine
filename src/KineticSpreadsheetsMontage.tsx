import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const KineticSpreadsheetsMontage: React.FC = () => {
  const frame = useCurrentFrame();

  // Micro-motion continuous background scale (Rule 30 Anti-Static Frame Law)
  const bgScale = interpolate(frame, [0, 840], [1.0, 1.05]);

  // 14 cuts, assuming 60 frames (1 second) per cut for now.
  const activeCut = Math.floor(frame / 60) + 1;

  // Kinetic Strikethrough line progress for Cut 7
  const strikethroughProgress = interpolate(frame - (6 * 60), [10, 30], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', transform: `scale(${bgScale})` }}>
      
      {/* CUT 1: Grey Gradient Intro */}
      {activeCut === 1 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          background: 'radial-gradient(circle, #EAEAEA 0%, #999999 100%)',
          pointerEvents: 'none', padding: '0 120px'
        }}>
          <div style={{ fontSize: 60, color: '#111', fontFamily: 'Times New Roman, serif', lineHeight: 1.4 }}>
            ...data isolation, poor version control, and manual interactions.<br/><br/>
            ...in at least a preliminary way, the reliance on <strong>spreadsheets</strong> creates immense technical debt.
          </div>
        </div>
      )}

      {/* CUT 2: Dictionary Definition */}
      {activeCut === 2 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none', padding: '0 120px'
        }}>
          <div style={{ fontSize: 50, color: '#111', fontFamily: 'Times New Roman, serif', lineHeight: 1.4 }}>
            <span style={{ fontSize: 90, fontWeight: 'bold' }}>spreadsheets</span> /'spredʃi:t/<br/><br/>
            <i>noun</i><br/>
            1. Electronic documents in which data arranged in the rows and columns...
          </div>
        </div>
      )}

      {/* CUT 3: Blue Background "it's constant in enterprise finance." */}
      {activeCut === 3 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#40a9ff', // Octane Blue
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 80, color: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, textAlign: 'center' }}>
            it's constant<br/>in enterprise finance.
          </div>
        </div>
      )}

      {/* CUT 4: Black Background "Ledgers multiply." */}
      {activeCut === 4 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000000',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 100, color: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900 }}>
            Ledgers multiply.
          </div>
        </div>
      )}

      {/* CUT 5: Black Background "Spreadsheets break." */}
      {activeCut === 5 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000000',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 100, color: '#40a9ff', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900 }}>
            Spreadsheets break.
          </div>
        </div>
      )}

      {/* CUT 6: Black Background "MONTH END" Grid */}
      {activeCut === 6 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000000',
          pointerEvents: 'none',
          padding: '100px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} style={{
                padding: '20px 40px',
                borderRadius: '12px',
                backgroundColor: i % 7 === 3 ? '#0f62fe' : '#1e1e1e', // IBM Corporate Blue or dark grey
                color: i % 7 === 3 ? '#FFFFFF' : '#888888',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: 30
              }}>
                MONTH END
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CUT 7: Black Background "Don't simplify your business." */}
      {activeCut === 7 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000000',
          pointerEvents: 'none'
        }}>
          <div style={{ position: 'relative', fontSize: 90, color: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900 }}>
            Don't simplify your <span style={{ position: 'relative' }}>
              business.
              <div style={{
                position: 'absolute', top: '50%', left: 0, width: `${strikethroughProgress}%`, height: '12px',
                backgroundColor: '#40a9ff', borderRadius: '6px',
                boxShadow: '0px 4px 10px rgba(64, 169, 255, 0.4)'
              }} />
            </span>
          </div>
        </div>
      )}

      {/* CUT 8: Black Background "Automate your path to better decisions." */}
      {activeCut === 8 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000000',
          pointerEvents: 'none', padding: '0 100px'
        }}>
          <div style={{ fontSize: 90, color: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, textAlign: 'center', lineHeight: 1.2 }}>
            Automate your path<br/>to <span style={{ backgroundColor: '#0f62fe', padding: '10px 30px', borderRadius: '12px', color: '#FFF' }}>better</span> decisions.
          </div>
        </div>
      )}

      {/* CUT 9: octane helps you scale enterprise performance */}
      {activeCut === 9 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000', pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 100, fontWeight: 'bold', color: '#FFF', fontFamily: 'Inter, system-ui, sans-serif' }}>octane</div>
          <div style={{ fontSize: 70, color: '#FFF', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, marginTop: 40, textAlign: 'center' }}>
            helps you scale<br/><span style={{ color: '#40a9ff' }}>enterprise performance</span>
          </div>
        </div>
      )}

      {/* CUT 10: with IBM Planning Analytics built for scale, */}
      {activeCut === 10 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000', pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 70, color: '#FFF', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, textAlign: 'center' }}>
            with IBM Planning Analytics<br/><span style={{ color: '#40a9ff' }}>built for scale,</span>
          </div>
        </div>
      )}

      {/* CUT 11: automation that handles the heavy lifting, */}
      {activeCut === 11 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000', pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 70, color: '#FFF', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, textAlign: 'center' }}>
            automation that handles<br/><span style={{ color: '#40a9ff' }}>the heavy lifting,</span>
          </div>
        </div>
      )}

      {/* CUT 12: and FP&A craftsmanship that lasts. */}
      {activeCut === 12 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#000', pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 70, color: '#FFF', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, textAlign: 'center' }}>
            and FP&A craftsmanship<br/>that lasts.
          </div>
        </div>
      )}

      {/* CUT 13: octane | IBM Gold Partner */}
      {activeCut === 13 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '40px',
          backgroundColor: '#000', pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 90, fontWeight: 'bold', color: '#FFF', fontFamily: 'Inter, system-ui, sans-serif' }}>octane</div>
          <div style={{ height: '90px', width: '2px', backgroundColor: '#444' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 60, fontWeight: '900', color: '#FFF', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '4px' }}>IBM</div>
            <div style={{ fontSize: 20, color: '#AAA', fontFamily: 'Inter, system-ui, sans-serif' }}>Gold Partner</div>
          </div>
        </div>
      )}

      {/* CUT 14: Turn planning into competitive advantage */}
      {activeCut === 14 && (
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '40px',
          backgroundColor: '#000', pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 80, fontWeight: '900', color: '#FFF', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center' }}>
            Turn planning into<br/>competitive advantage
          </div>
          <div style={{
            padding: '20px 60px',
            backgroundColor: '#111',
            border: '2px solid #40a9ff',
            borderRadius: '40px',
            color: '#FFF',
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'Inter, system-ui, sans-serif',
            boxShadow: '0 0 30px rgba(64, 169, 255, 0.4)'
          }}>
            octanesolutions.com.au
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
