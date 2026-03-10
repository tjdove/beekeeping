import { useState, useCallback } from "react";

const questions = [
  // Vision
  { q: "Which color can honey bees NOT see?", options: ["Blue", "Ultraviolet", "Red", "Yellow"], answer: 2, section: "👁 Bee Vision" },
  { q: "Can honey bees see infrared light?", options: ["Yes — they use it to detect warm flowers", "No — their vision range does not extend into infrared", "Only drones can detect infrared", "Only in darkness inside the hive"], answer: 1, section: "👁 Bee Vision" },
  { q: "What is the function of the ocelli?", options: ["Form detailed images for navigation", "Detect light intensity and brightness — act as a light meter, not a camera", "Detect ultraviolet nectar guides on flowers", "Help drones spot virgin queens mid-flight"], answer: 1, section: "👁 Bee Vision" },
  { q: "How many ocelli does a honey bee have?", options: ["1", "2", "3", "4"], answer: 2, section: "👁 Bee Vision" },
  { q: "Why do drones have larger compound eyes than workers?", options: ["They need to navigate back to the hive after dark", "Their larger eyes wrap around the head to help spot virgin queens during mating flights", "They forage at greater distances and need better depth perception", "They cannot use Johnston's organ so rely more heavily on vision"], answer: 1, section: "👁 Bee Vision" },
  { q: "What are the individual lenses in a compound eye called?", options: ["Ocelli", "Ommatidia", "Hamuli", "Corbicula"], answer: 1, section: "👁 Bee Vision" },
  { q: "How do bees navigate when the sun is hidden behind clouds?", options: ["They return to the hive and wait for sun", "They use landmarks only", "They detect polarized light from the sky to determine sun position", "They use Johnston's organ to sense magnetic fields"], answer: 2, section: "👁 Bee Vision" },
  { q: "Why are slow, deliberate movements less provocative to bees than fast ones?", options: ["Slow movements produce less carbon dioxide which agitates bees", "Bee compound eyes excel at detecting motion — fast movements trigger defensive response", "Fast movements disturb air currents and release alarm pheromone", "Bees associate fast movements with predators by scent"], answer: 1, section: "👁 Bee Vision" },

  // Johnston's Organ & Communication
  { q: "Where is Johnston's organ located?", options: ["In the thorax near the flight muscles", "In the second segment of the antenna (pedicel)", "At the base of the stinger", "Inside the compound eye"], answer: 1, section: "📡 Communication" },
  { q: "What does Johnston's organ detect?", options: ["Ultraviolet light patterns on flowers", "Mechanical vibrations and antenna deflection — used to decode the waggle dance", "Chemical pheromone signals from the queen", "Polarized light for sun navigation"], answer: 1, section: "📡 Communication" },
  { q: "How do bees in a dark hive decode the waggle dance?", options: ["They watch the dancer's movements using UV vision", "They feel the dance through antenna contact and comb vibrations via Johnston's organ", "The dancing bee emits a specific pheromone that encodes direction", "They follow the dancer outside and observe the sun angle directly"], answer: 1, section: "📡 Communication" },
  { q: "In the waggle dance, what does the ANGLE of the waggle run represent?", options: ["The quality/richness of the food source", "The distance to the food source", "The direction to the food source relative to the sun", "The number of bees needed to harvest the source"], answer: 2, section: "📡 Communication" },
  { q: "What does the tremble dance signal?", options: ["A swarm is imminent", "An alarm response to a predator", "Too much incoming nectar — recruits more receiver bees to process it", "A request for more foragers to leave the hive"], answer: 2, section: "📡 Communication" },
  { q: "Ultraviolet patterns on flowers visible to bees but invisible to humans are called:", options: ["Pollen guides", "Nectar guides", "Floral fidelity markers", "Polarized signals"], answer: 1, section: "📡 Communication" },

  // IPM
  { q: "What is the correct order of IPM intervention?", options: ["Hard chemicals first, then soft, then mechanical", "Monitor first, cultural/mechanical controls first, soft chemicals second, hard chemicals last resort", "Treat on a fixed schedule regardless of mite levels", "Biological controls only — never use any chemicals"], answer: 1, section: "🛡 IPM" },
  { q: "What is the general Varroa action threshold during brood season?", options: ["10% mite load (10 mites per 100 bees)", "5% mite load", "2-3% mite load (2-3 mites per 100 bees on alcohol wash)", "Any detectable mites require immediate treatment"], answer: 2, section: "🛡 IPM" },
  { q: "Why is drone brood removal an effective IPM strategy for Varroa?", options: ["Drones carry more alarm pheromone which attracts mites away from workers", "Varroa prefer the longer capping period of drone brood — removing capped drone frames removes mites with them", "Drones spread mites between hives, so reducing drones limits spread", "Drone larvae produce a chemical that inhibits Varroa reproduction in worker brood"], answer: 1, section: "🛡 IPM" },
  { q: "Why did Apistan (fluvalinate) resistance develop in Varroa populations?", options: ["Beekeepers used it at too low a dose", "Overuse in the 1990s selected for resistant mite populations — a key reason IPM rotation matters", "It was combined incorrectly with oxalic acid", "Resistance is genetic in all Varroa and was present from the start"], answer: 1, section: "🛡 IPM" },
  { q: "Which of these is a BIOLOGICAL IPM control for Varroa?", options: ["Screened bottom board", "Oxalic acid vaporization", "Hygienic bee genetics — bees bred to detect and remove mite-infested brood", "Apivar (amitraz) strips"], answer: 2, section: "🛡 IPM" },
  { q: "A screened bottom board contributes to IPM primarily by:", options: ["Preventing all pests from entering the hive", "Allowing Varroa mites that fall off bees to drop out and not reattach; also improves ventilation", "Filtering pesticides from incoming nectar", "Keeping the queen from leaving during a swarm"], answer: 1, section: "🛡 IPM" },
  { q: "Bacillus thuringiensis (Bt / Certan) is used in IPM against:", options: ["Varroa mites", "American Foulbrood bacteria", "Wax moth larvae", "Small Hive Beetle adults"], answer: 2, section: "🛡 IPM" },
  { q: "Which is considered a 'soft' chemical treatment for Varroa?", options: ["Apivar (amitraz)", "Apistan (fluvalinate)", "CheckMite+ (coumaphos)", "Formic acid (MAQS)"], answer: 3, section: "🛡 IPM" },

  // Wing Damage & Pests Deeper
  { q: "K-wing is specifically associated with which pest?", options: ["Varroa destructor", "Small Hive Beetle", "Tracheal mite (Acarapis woodi)", "Nosema ceranae"], answer: 2, section: "🔬 Pests Deep" },
  { q: "What is the visual difference between K-wing and Deformed Wing Virus?", options: ["They look identical — only a lab test can distinguish them", "K-wing: normal-looking wings that are unhooked and splayed; DWV: crumpled, shriveled, underdeveloped wings", "K-wing affects only the hindwing; DWV affects only the forewing", "K-wing causes wing loss entirely; DWV causes discoloration only"], answer: 1, section: "🔬 Pests Deep" },
  { q: "Tracheal mites live inside which part of the bee?", options: ["The honey stomach", "The trachea (breathing tubes) of adult bees", "The wax glands on the abdomen", "The spermatheca of the queen"], answer: 1, section: "🔬 Pests Deep" },
  { q: "What is a traditional treatment associated with tracheal mites?", options: ["Oxalic acid vaporization", "Menthol crystals or vegetable oil (grease) patties", "Formic acid strips", "Apivar amitraz strips"], answer: 1, section: "🔬 Pests Deep" },

  // Nosema & Gut Disease
  { q: "Nosema ceranae differs from Nosema apis primarily because:", options: ["It affects larvae rather than adult bees", "It is more virulent, often causes no visible dysentery, and is now the dominant global strain", "It is a bacterium rather than a fungus", "It only affects queens, not workers"], answer: 1, section: "🏥 Disease Deep" },
  { q: "What does Nosema do to an infected bee?", options: ["Blocks the trachea preventing oxygen intake", "Destroys midgut cells so the bee cannot absorb nutrients — effectively starves from the inside", "Attacks the nervous system causing trembling and paralysis", "Infects the wax glands causing deformed comb production"], answer: 1, section: "🏥 Disease Deep" },
  { q: "Purple brood is caused by:", options: ["A highly contagious virus spreading through contact", "Varroa mites feeding on developing pupae", "Bees foraging heavily on titi plant nectar in the SE United States", "A fungal infection related to chalkbrood"], answer: 2, section: "🏥 Disease Deep" },
  { q: "Purple brood requires what treatment?", options: ["Immediate burning of infected equipment", "Terramycin applied as a preventative", "No treatment — self-resolving once titi bloom ends; not infectious", "Oxalic acid to eliminate the vector"], answer: 2, section: "🏥 Disease Deep" },
  { q: "What symptom most clearly distinguishes pesticide kill from a disease outbreak?", options: ["Larvae turning brown inside capped cells", "Sudden mass die-off of ADULT bees at the entrance, possibly with twitching; brood often unaffected", "Bees with deformed wings crawling near the entrance", "Spotty brood pattern with sunken cappings"], answer: 1, section: "🏥 Disease Deep" },

  // History & Figures
  { q: "What single discovery made the Langstroth hive revolutionary?", options: ["He invented the smoker that calmed bees enough to inspect them", "He discovered bee space (3/8 inch) allowing movable frames bees wouldn't glue shut", "He identified the waggle dance as a communication system", "He developed the first treatment for American Foulbrood"], answer: 1, section: "📜 History" },
  { q: "What year did Langstroth patent the movable frame hive?", options: ["1820", "1851", "1876", "1903"], answer: 1, section: "📜 History" },
  { q: "Amos Root is best remembered for:", options: ["Inventing the modern bee smoker", "Decoding the waggle dance", "Publishing Bee Culture magazine and a comprehensive beekeeping encyclopedia", "Discovering bee space and designing the Langstroth hive"], answer: 2, section: "📜 History" },
  { q: "Moses Quinby's primary contribution to beekeeping was:", options: ["The movable frame hive", "Inventing the modern bellows-style bee smoker", "Writing the first American beekeeping manual only", "Discovering that queens mate with multiple drones"], answer: 1, section: "📜 History" },
  { q: "Karl von Frisch received the Nobel Prize in:", options: ["1951", "1965", "1973", "1982"], answer: 2, section: "📜 History" },
  { q: "The NCSBA Master Beekeeper Program was founded by whom and when?", options: ["Moses Quinby in 1875 at UNC Chapel Hill", "Dr. John Ambrose in 1982 at NC State University", "Karl von Frisch in 1951 at NCSU", "Amos Root in 1903 through Bee Culture magazine"], answer: 1, section: "📜 History" },

  // Proventriculus & Anatomy Deeper
  { q: "The proventriculus is best described as:", options: ["The bee's true digestive stomach where nutrients are absorbed", "A one-way valve between the honey stomach and true stomach that also filters pollen", "The organ that produces royal jelly in nurse bees", "The storage sac where foragers hold nectar during flight"], answer: 1, section: "🐝 Anatomy Deep" },
  { q: "What is the honey stomach (crop) used for?", options: ["Digesting pollen for the bee's own nutrition", "Storing nectar during transport back to the hive — not for the bee's own digestion", "Producing beeswax from consumed honey", "Filtering pesticides out of incoming nectar"], answer: 1, section: "🐝 Anatomy Deep" },
  { q: "How does the proventriculus help separate pollen from nectar?", options: ["It uses heat to evaporate liquid, leaving pollen behind", "Finger-like projections grab pollen from nectar and push it into the true stomach for the bee's nutrition", "It secretes an enzyme that binds to pollen, separating it chemically", "Pollen sinks by gravity while nectar floats above the valve"], answer: 1, section: "🐝 Anatomy Deep" },
  { q: "Which gland produces the 9-ODA pheromone (queen substance)?", options: ["Nasanov gland", "Dufour's gland", "Hypopharyngeal gland", "Mandibular gland"], answer: 3, section: "🐝 Anatomy Deep" },
  { q: "What does 9-ODA (queen substance) do in the colony?", options: ["Triggers alarm response in guard bees", "Inhibits worker ovary development and suppresses swarm impulse", "Guides foragers back to the hive entrance", "Signals nurse bees to begin producing royal jelly"], answer: 1, section: "🐝 Anatomy Deep" },

  // Misc / Commonly Missed
  { q: "Floral fidelity means:", options: ["Bees always return to flowers within 500 meters of the hive", "A forager works only one flower species per trip, depositing compatible pollen on each flower visited", "Bees mark flowers with pheromone after visiting to claim them", "Queen bees only lay eggs in cells built from a single flower's wax"], answer: 1, section: "🌸 Plants & Misc" },
  { q: "Why is sourwood honey particularly prized in NC?", options: ["It has the lowest moisture content of any NC honey and never crystallizes", "It has a distinctive, highly regarded flavor and is produced in NC mountain and piedmont regions", "It is the only NC honey approved for infant consumption", "Sourwood trees only bloom every other year making it very rare"], answer: 1, section: "🌸 Plants & Misc" },
  { q: "What is the minimum honey storage a NC colony should have going into winter?", options: ["20-30 lbs", "40-50 lbs", "60-80 lbs", "100+ lbs"], answer: 2, section: "🌸 Plants & Misc" },
  { q: "Which fall plant is a critical POLLEN source (not just nectar) helping colonies build winter bees?", options: ["Sourwood", "Tulip poplar", "Goldenrod", "White clover"], answer: 2, section: "🌸 Plants & Misc" },
  { q: "What is the greatest enemy of a wintering bee colony in terms of hive environment?", options: ["Cold temperatures below freezing", "Moisture buildup inside the hive — not cold itself", "Wind exposure on the north side of the hive", "Lack of sunlight on the hive entrance"], answer: 1, section: "🌸 Plants & Misc" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Nunito:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at top, #0f172a 0%, #060912 70%);
    font-family: 'Nunito', sans-serif;
    padding: 24px 16px 48px;
    display: flex; flex-direction: column; align-items: center;
  }

  .header { text-align: center; margin-bottom: 28px; }
  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.9rem; color: #93c5fd;
    text-shadow: 0 0 40px rgba(147,197,253,0.35);
    margin-bottom: 4px; letter-spacing: 0.02em;
  }
  .header p {
    color: #60a5fa; font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.7;
  }

  .progress-wrap {
    width: 100%; max-width: 640px;
    background: #0f1f3d; border-radius: 99px;
    height: 7px; margin-bottom: 8px; overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #93c5fd);
    border-radius: 99px; transition: width 0.4s ease;
  }
  .progress-label {
    width: 100%; max-width: 640px;
    display: flex; justify-content: space-between;
    color: #60a5fa; font-size: 0.78rem;
    font-weight: 700; letter-spacing: 0.05em;
    margin-bottom: 20px; opacity: 0.8;
  }

  .card {
    background: #0c1628;
    border: 1px solid #1e3a5f;
    border-radius: 20px; width: 100%; max-width: 640px;
    padding: 30px 26px 26px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(147,197,253,0.05);
    animation: fadeIn 0.3s ease;
  }

  .section-tag {
    display: inline-block;
    background: rgba(59,130,246,0.1);
    border: 1px solid rgba(59,130,246,0.25);
    color: #60a5fa; font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 99px; margin-bottom: 16px;
  }

  .question {
    font-family: 'Playfair Display', serif;
    font-size: 1.18rem; color: #eff6ff;
    line-height: 1.55; margin-bottom: 26px;
  }

  .options { display: flex; flex-direction: column; gap: 10px; }

  .opt {
    background: rgba(255,255,255,0.02);
    border: 1.5px solid #1e3a5f; border-radius: 12px;
    color: #bfdbfe; font-family: 'Nunito', sans-serif;
    font-size: 0.91rem; font-weight: 600;
    padding: 13px 16px; cursor: pointer;
    text-align: left; transition: all 0.15s ease; line-height: 1.4;
  }
  .opt:hover:not(:disabled) {
    background: rgba(59,130,246,0.08);
    border-color: #3b82f6; color: #93c5fd;
    transform: translateX(3px);
  }
  .opt.correct { background: rgba(134,239,172,0.09); border-color: #86efac; color: #86efac; }
  .opt.wrong   { background: rgba(252,165,165,0.08); border-color: #fca5a5; color: #fca5a5; }
  .opt.reveal  { background: rgba(134,239,172,0.04); border-color: rgba(134,239,172,0.35); color: #86efac; }

  .letter { margin-right: 10px; opacity: 0.4; }

  .feedback {
    margin-top: 18px; padding: 13px 16px; border-radius: 12px;
    font-size: 0.87rem; font-weight: 600; line-height: 1.5;
    animation: fadeIn 0.25s ease;
  }
  .feedback.correct { background: rgba(134,239,172,0.06); border: 1px solid rgba(134,239,172,0.22); color: #86efac; }
  .feedback.wrong   { background: rgba(252,165,165,0.06); border: 1px solid rgba(252,165,165,0.22); color: #fca5a5; }

  .next-btn {
    margin-top: 18px; width: 100%; padding: 13px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border: none; border-radius: 12px;
    color: #eff6ff; font-family: 'Nunito', sans-serif;
    font-size: 0.93rem; font-weight: 800;
    letter-spacing: 0.05em; cursor: pointer;
    text-transform: uppercase; transition: all 0.2s;
  }
  .next-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(59,130,246,0.35); }

  .score-card {
    text-align: center; background: #0c1628;
    border: 1px solid #1e3a5f; border-radius: 20px;
    width: 100%; max-width: 640px; padding: 44px 28px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.6);
    animation: fadeIn 0.4s ease;
  }
  .score-emoji { font-size: 3.2rem; margin-bottom: 14px; }
  .score-big {
    font-family: 'Playfair Display', serif; font-size: 3rem;
    color: #93c5fd; text-shadow: 0 0 40px rgba(147,197,253,0.4);
    margin-bottom: 6px;
  }
  .score-sub {
    color: #60a5fa; font-size: 0.88rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    opacity: 0.8; margin-bottom: 28px;
  }
  .breakdown { display: flex; justify-content: center; gap: 36px; margin-bottom: 32px; }
  .stat { display: flex; flex-direction: column; align-items: center; }
  .stat .n { font-size: 1.7rem; font-weight: 800; margin-bottom: 2px; }
  .stat .l { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #60a5fa; opacity: 0.7; }
  .stat .n.g { color: #86efac; }
  .stat .n.r { color: #fca5a5; }
  .stat .n.a { color: #bfdbfe; }

  .retry-btn {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border: none; border-radius: 12px; color: #eff6ff;
    font-family: 'Nunito', sans-serif; font-size: 0.93rem; font-weight: 800;
    padding: 13px 36px; cursor: pointer;
    letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.2s;
  }
  .retry-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(59,130,246,0.35); }

  .missed-list {
    margin-top: 28px; text-align: left;
    border-top: 1px solid #1e3a5f; padding-top: 24px;
  }
  .missed-list h3 { font-family: 'Playfair Display', serif; color: #fca5a5; font-size: 1rem; margin-bottom: 14px; }
  .missed-item {
    background: rgba(252,165,165,0.04); border: 1px solid rgba(252,165,165,0.12);
    border-radius: 10px; padding: 12px 14px; margin-bottom: 8px;
    font-size: 0.82rem; color: #bfdbfe;
  }
  .missed-item strong { color: #fca5a5; display: block; margin-bottom: 4px; }
  .missed-item span { color: #86efac; font-weight: 700; }

  @keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
`;

export default function BeekeeperQuiz3() {
  const [deck] = useState(() => shuffle(questions));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [missed, setMissed] = useState([]);
  const [key, setKey] = useState(0);

  const current = deck[idx];
  const answered = selected !== null;

  const handleSelect = useCallback((i) => {
    if (answered) return;
    setSelected(i);
    if (i === current.answer) setScore(s => s + 1);
    else setMissed(m => [...m, current]);
  }, [answered, current]);

  const handleNext = () => {
    if (idx + 1 >= deck.length) setDone(true);
    else { setIdx(i => i + 1); setSelected(null); }
  };

  const handleRetry = () => {
    setIdx(0); setSelected(null);
    setScore(0); setDone(false);
    setMissed([]); setKey(k => k + 1);
  };

  const pct = Math.round((score / deck.length) * 100);
  const pass = pct >= 75;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <h1>🐝 NC Beekeepers — Round 3</h1>
          <p>Vision · IPM · Anatomy · History</p>
        </div>

        {!done ? (
          <>
            <div className="progress-wrap">
              <div className="progress-fill" style={{ width: `${(idx / deck.length) * 100}%` }} />
            </div>
            <div className="progress-label">
              <span>Question {idx + 1} of {deck.length}</span>
              <span>✓ {score} correct</span>
            </div>

            <div className="card" key={`${key}-${idx}`}>
              <div className="section-tag">{current.section}</div>
              <div className="question">{current.q}</div>
              <div className="options">
                {current.options.map((opt, i) => {
                  let cls = "opt";
                  if (answered) {
                    if (i === current.answer && i === selected) cls = "opt correct";
                    else if (i === selected) cls = "opt wrong";
                    else if (i === current.answer) cls = "opt reveal";
                  }
                  return (
                    <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={answered}>
                      <span className="letter">{["A","B","C","D"][i]}.</span>{opt}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className={`feedback ${selected === current.answer ? "correct" : "wrong"}`}>
                  {selected === current.answer
                    ? "✓ Correct!"
                    : `✗ Correct answer: "${current.options[current.answer]}"`}
                </div>
              )}
              {answered && (
                <button className="next-btn" onClick={handleNext}>
                  {idx + 1 >= deck.length ? "See Results →" : "Next Question →"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="score-card">
            <div className="score-emoji">{pass ? "🏆" : "📚"}</div>
            <div className="score-big">{pct}%</div>
            <div className="score-sub">{pass ? "Passing Score — Exam ready!" : "Keep going — 75% needed to pass"}</div>
            <div className="breakdown">
              <div className="stat"><span className="n g">{score}</span><span className="l">Correct</span></div>
              <div className="stat"><span className="n r">{deck.length - score}</span><span className="l">Missed</span></div>
              <div className="stat"><span className="n a">{deck.length}</span><span className="l">Total</span></div>
            </div>
            <button className="retry-btn" onClick={handleRetry}>🔄 Shuffle & Retry</button>

            {missed.length > 0 && (
              <div className="missed-list">
                <h3>❌ Review These ({missed.length})</h3>
                {missed.map((m, i) => (
                  <div className="missed-item" key={i}>
                    <strong>{m.q}</strong>
                    <span>✓ {m.options[m.answer]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
