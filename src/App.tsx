import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowUp, ArrowUpRight, Menu, X } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
import logo from '../Images/logo.svg'
import './App.css'

const projects = [
  {
    title: 'Arc Studio',
    description: 'A collaborative canvas that turns scattered thinking into clear product direction.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=88',
  },
  {
    title: 'Roam',
    description: 'Making the messy work of planning a trip feel fluid, personal, and shared.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=88',
  },
  {
    title: 'Pulse',
    description: 'A clearer workflow for creating, reviewing, and publishing reports.',
    image: '/pulse-cover.svg',
  },
]

const posts = [
  ['From Exposing What AI Knows to Designing What Humans Need', 'Rethinking AI agent scores, rankings, and signals', '10 min', '31st August 26', 'https://medium.com/@badalparina1/ai-agent-signals-rethinking-ai-scores-rankings-and-what-it-means-for-users-to-trust-system-f14a02dd6120?sharedUserId=badalparina1'],
  ['What prototypes are really for', 'Using prototypes to answer the right questions before building', '5 min', '18th January 26', '#contact'],
  ['Conducting Design Thinking Workshop', 'A practical guide to aligning stakeholders through hands-on collaboration', '5 min read', '21st August 23', 'https://medium.com/@uxandyouti/conducting-design-thinking-workshop-for-stakeholders-9fd25b2425e0'],
]

const navigation = ['Projects', 'About', 'Blog', 'Contact']
const heroRoles = ['Designer', 'Mentor', 'CFI Cyclist', 'Motorsports Enthusiast']
const greetings = ['Hello', 'नमस्ते', 'வணக்கம்', 'నమస్కారం', 'नमस्कार', 'Bonjour', 'Hola', 'Ciao', 'Hallo', 'Olá']

function playProjectOpenSound() {
  if (!('AudioContext' in window)) return
  const audioContext = new AudioContext()

  void audioContext.resume().then(() => {
    if (audioContext.state !== 'running') return
    const startAt = audioContext.currentTime
    const master = audioContext.createGain()
    const compressor = audioContext.createDynamicsCompressor()
    master.gain.value = 0.34
    compressor.threshold.value = -20
    compressor.knee.value = 12
    compressor.ratio.value = 4
    compressor.attack.value = 0.006
    compressor.release.value = 0.42
    master.connect(compressor).connect(audioContext.destination)

    const impulse = audioContext.createBuffer(2, Math.ceil(audioContext.sampleRate * 1.35), audioContext.sampleRate)
    for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
      const data = impulse.getChannelData(channel)
      for (let sample = 0; sample < data.length; sample += 1) {
        data[sample] = (Math.random() * 2 - 1) * ((1 - sample / data.length) ** 4) * 0.2
      }
    }
    const reverb = audioContext.createConvolver()
    const reverbGain = audioContext.createGain()
    reverb.buffer = impulse
    reverbGain.gain.value = 0.16
    reverb.connect(reverbGain).connect(master)

    const clickDuration = 0.055
    const clickBuffer = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * clickDuration), audioContext.sampleRate)
    const clickData = clickBuffer.getChannelData(0)
    for (let sample = 0; sample < clickData.length; sample += 1) {
      clickData[sample] = (Math.random() * 2 - 1) * ((1 - sample / clickData.length) ** 7)
    }

    const click = audioContext.createBufferSource()
    const filter = audioContext.createBiquadFilter()
    const gain = audioContext.createGain()
    click.buffer = clickBuffer
    filter.type = 'lowpass'
    filter.frequency.value = 880
    filter.Q.value = 0.7
    gain.gain.setValueAtTime(0.0001, startAt)
    gain.gain.exponentialRampToValueAtTime(0.035, startAt + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + clickDuration)
    click.connect(filter).connect(gain).connect(master)
    click.start(startAt)
    click.stop(startAt + clickDuration)

    const bass = audioContext.createOscillator()
    const bassGain = audioContext.createGain()
    bass.type = 'sine'
    bass.frequency.setValueAtTime(58, startAt)
    bass.frequency.exponentialRampToValueAtTime(73, startAt + 0.64)
    bassGain.gain.setValueAtTime(0.0001, startAt)
    bassGain.gain.exponentialRampToValueAtTime(0.055, startAt + 0.04)
    bassGain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.7)
    bass.connect(bassGain).connect(master)
    bassGain.connect(reverb)
    bass.start(startAt)
    bass.stop(startAt + 0.72)

    const body = audioContext.createOscillator()
    const bodyGain = audioContext.createGain()
    const bodyFilter = audioContext.createBiquadFilter()
    body.type = 'triangle'
    body.frequency.setValueAtTime(123, startAt + 0.012)
    body.frequency.exponentialRampToValueAtTime(147, startAt + 0.44)
    bodyFilter.type = 'lowpass'
    bodyFilter.frequency.value = 360
    bodyFilter.Q.value = 1.1
    bodyGain.gain.setValueAtTime(0.0001, startAt + 0.012)
    bodyGain.gain.exponentialRampToValueAtTime(0.022, startAt + 0.055)
    bodyGain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.56)
    body.connect(bodyFilter).connect(bodyGain).connect(master)
    bodyGain.connect(reverb)
    body.start(startAt + 0.012)
    body.stop(startAt + 0.58)

    ;[196, 247, 294].forEach((frequency, index) => {
      const tone = audioContext.createOscillator()
      const toneGain = audioContext.createGain()
      const toneStart = startAt + 0.09 + index * 0.045
      tone.type = 'sine'
      tone.frequency.value = frequency
      toneGain.gain.setValueAtTime(0.0001, toneStart)
      toneGain.gain.exponentialRampToValueAtTime(0.038 - index * 0.004, toneStart + 0.11)
      toneGain.gain.exponentialRampToValueAtTime(0.001, toneStart + 0.78)
      tone.connect(toneGain).connect(master)
      toneGain.connect(reverb)
      tone.start(toneStart)
      tone.stop(toneStart + 0.8)
    })

    window.setTimeout(() => void audioContext.close(), 1600)
  }).catch(() => void audioContext.close())
}

function playProjectBackSound() {
  if (!('AudioContext' in window)) return
  const audioContext = new AudioContext()

  void audioContext.resume().then(() => {
    if (audioContext.state !== 'running') return
    const startAt = audioContext.currentTime
    const master = audioContext.createGain()
    master.gain.value = 0.35
    master.connect(audioContext.destination)

    const tone = audioContext.createOscillator()
    const toneGain = audioContext.createGain()
    tone.type = 'sine'
    tone.frequency.setValueAtTime(280, startAt)
    tone.frequency.exponentialRampToValueAtTime(120, startAt + 0.4)
    toneGain.gain.setValueAtTime(0.0001, startAt)
    toneGain.gain.exponentialRampToValueAtTime(0.05, startAt + 0.05)
    toneGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.45)
    tone.connect(toneGain).connect(master)
    tone.start(startAt)
    tone.stop(startAt + 0.5)

    window.setTimeout(() => void audioContext.close(), 600)
  }).catch(() => void audioContext.close())
}

const pixelRoles = [
  {
    label: 'Designer',
    art: [
      '             11 ', '            1221', '           12221', '          12221 ',
      '         12221  ', '  111   12221   ', ' 14441 12221    ', '14444412221     ',
      '144441221 111   ', ' 1441221 1551   ', '  12221 15551   ', ' 12221   151    ',
      '12221     11    ', '121             ', '11              ', '                ',
    ],
  },
  {
    label: 'Mentor',
    art: [
      '  1111111111    ', ' 122222222221   ', '12222222222221  ', '12211222112221  ',
      '12211222112221  ', '12222222222221  ', '12221111222221  ', ' 122222222221   ',
      '  1111122211    ', '      1221      ', '     144441     ', '     144441     ',
      '      4441      ', '     333333     ', '    33333333    ', '   3333  3333   ',
    ],
  },
  {
    label: 'CFI',
    art: [
      '       11       ', '      1221      ', '      1221      ', '      1221      ',
      '      1221      ', '  11  1221  11  ', '1221 12221 1221 ', '1222222222222221',
      '1111122222211111', '    12222221    ', '     122221     ', '      1221      ',
      '     112211     ', '    13311331    ', '   1331  1331   ', '   111    111   ',
    ],
  },
  {
    label: 'Cycling',
    art: [
      '       111      ', '      14441     ', '      14441     ', '       441      ',
      '     113331     ', '    13333331    ', '   13 332  31   ', '  13  3221  31  ',
      ' 13  12221  31  ', '11111221111  11 ', '1222121 12211221', '2111221 2111122 ',
      '21  121  12  12 ', '121  21  21  21 ', '1221121  1221121', ' 1111    1111   ',
    ],
  },
  {
    label: 'Motorsport',
    art: [
      '1111111111   11 ', '1221122112   11 ', '2112211221   11 ', '1221122112   11 ',
      '2112211221   11 ', '1111111111   11 ', '             11 ', '     111111  11 ',
      '   11222222111  ', '  1222444222221 ', ' 122444444422221', ' 124411111144221',
      '1244115555114221', '1244155555514221', ' 12211111111221 ', '  111111111111  ',
    ],
  },
]

function AboutPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'life' | 'work'>('life')
  return (
    <main className="about-page-shell">
      <section className="about-section about-page" id="about">
        <div className="about-page-top">
          <a className="about-back" href="/" onClick={(event) => { event.preventDefault(); playProjectBackSound(); onBack() }}>
            <ArrowLeft size={18} /> Back
          </a>
          <p>Parinav Badal / About</p>
        </div>
        <div className="about-tabs">
          <button 
            className={`about-tab ${activeTab === 'life' ? 'active' : ''}`}
            onClick={() => setActiveTab('life')}
          >
            Life
          </button>
          <button 
            className={`about-tab ${activeTab === 'work' ? 'active' : ''}`}
            onClick={() => setActiveTab('work')}
          >
            Work
          </button>
        </div>
        <div className="about-grid">
          <div className="about-copy scroll-reveal is-revealed">
            {activeTab === 'life' && (
              <>
                <p>I've lived, travelled, and grown up in motion. I grew up in Bengal, moved to Purnia, Bihar, for schooling, and later lived and studied across Delhi, Hyderabad, Bengaluru, Chennai, and Odisha. New places, people and cultures became so normal that change almost feels like built-in DNA.</p>
                
                <p>With limited exposure to the world outside, Hollywood movie CDs became my first window into it. Eventually, watching wasn't enough—I wanted to go see it myself.</p>
                
                <p>Career-wise, I wasn't exactly sure what I wanted, but I was 200% sure what I didn't want. After failing my first NIFT attempt, I was given ₹1,500 to fill out college forms and I had a good party with it. 😄 Luckily, I cracked it the next time—and somehow, the ₹1,500 incident never made it into the family history books.</p>
                
                <p>Since then, curiosity has taken me through design, studio photography and travel. I've travelled across 22 of India's 28 states and 5 of its 8 Union Territories, mostly on a motorcycle—a love since 10th standard. I've also travelled through Kenya, Tanzania and Mauritius, usually choosing roads and public transport over tourist itineraries. I like seeing how people live, getting a little lost, and figuring out what it feels like to belong somewhere.</p>
                
                <p>I'm also a CFI cyclist, with races including the HCL Cyclothon and Pedal for the Medal. Apparently, travelling long distances wasn't enough, so I decided to make my legs suffer too.</p>
                
                <p>And somewhere between all the moving, I learnt to cook and bake—because when life keeps changing your address, you might as well know how to make your own comfort food.</p>
              </>
            )}
            {activeTab === 'work' && (
              <>
                <p>I'm a product designer focused on building clear, human-centered experiences. My work spans discovery, systems thinking, interaction design, and close collaboration with stakeholders—turning complex problems into usable solutions.</p>
                
                <p>I've led design initiatives across B2B SaaS products, specializing in workflow optimization and design systems. I believe good design is invisible—it should make complex tasks feel effortless and empower users to do their best work.</p>
                
                <p>Beyond the pixels, I'm passionate about mentoring, conducting design workshops, and facilitating cross-functional alignment. I've worked with distributed teams, facilitated design thinking sessions, and helped organizations build scalable design practices from the ground up.</p>
                
                <p>My toolkit includes user research, prototyping, interaction design, and design systems—but my real focus is on understanding context and creating experiences that solve real problems for real people.</p>
              </>
            )}
          </div>
          <div className="about-collage scroll-reveal is-revealed">
            <div className="collage-item collage-item-1" style={{'--delay': '0ms'} as React.CSSProperties}><img src="/20260703_113437.jpg" alt="Travel moments" /></div>
            <div className="collage-item collage-item-2" style={{'--delay': '100ms'} as React.CSSProperties}><img src="/20260628_075247~3.jpg" alt="Adventure" /></div>
            <div className="collage-item collage-item-3" style={{'--delay': '200ms'} as React.CSSProperties}><img src="/20260704_154206(3)~2.jpg" alt="Journey" /></div>
            <div className="collage-item collage-item-4" style={{'--delay': '300ms'} as React.CSSProperties}><img src="/20260628_080652~3(1).jpg" alt="Exploration" /></div>
            <div className="collage-item collage-item-5" style={{'--delay': '400ms'} as React.CSSProperties}><img src="/20260624_100244~3.jpg" alt="Moments" /></div>
            <div className="collage-item collage-item-6" style={{'--delay': '500ms'} as React.CSSProperties}><img src="/20260713_231314~2.jpg" alt="Memories" /></div>
            <div className="collage-item collage-item-7" style={{'--delay': '600ms'} as React.CSSProperties}><img src="/20250606_100816.jpg" alt="Wanderlust" /></div>
            <div className="collage-item collage-item-8" style={{'--delay': '700ms'} as React.CSSProperties}><img src="/Screenshot%202026-09-01%20at%203.47.09%20AM.png" alt="Snapshot 1" /></div>
            <div className="collage-item collage-item-9" style={{'--delay': '800ms'} as React.CSSProperties}><img src="/Screenshot%202026-09-01%20at%203.50.49%20AM.png" alt="Snapshot 2" /></div>
          </div>
        </div>
      </section>
    </main>
  )
}

function PulseCaseStudy({ onBack }: { onBack: () => void }) {
  return (
    <main className="case-study-shell">
      <header className="case-study-nav">
        <a className="about-back" href="/" onClick={(event) => { event.preventDefault(); playProjectBackSound(); onBack() }}>
          <ArrowLeft size={18} /> Back
        </a>
        <p>Parinav Badal / Case study</p>
      </header>

      <article className="case-study">
        <section className="case-hero">
          <div className="case-hero-copy">
            <p className="kicker">Product design · B2B SaaS</p>
            <h1>Pulse</h1>
            <p className="case-deck">Making complex report creation feel clear, collaborative, and ready to publish.</p>
            <dl className="case-meta">
              <div><dt>Role</dt><dd>Lead Product Designer</dd></div>
              <div><dt>Focus</dt><dd>Research, systems, interaction</dd></div>
              <div><dt>Outcome</dt><dd>A unified publishing workflow</dd></div>
            </dl>
          </div>
          <div className="case-hero-art">
            <img src="/pulse-cover.svg" alt="Pulse dashboard showing report signals and priorities" />
          </div>
        </section>

        <section className="case-section case-intro">
          <p className="kicker">Overview</p>
          <div className="case-section-grid">
            <h2>From fragmented steps to one confident flow.</h2>
            <div>
              <p>Teams were moving between disconnected tools to create, review, approve, and publish reports. Important context was lost between handoffs, while progress remained difficult to understand.</p>
              <p>Pulse brings the work into one coherent experience—surfacing status, ownership, and the next useful action without adding more process.</p>
            </div>
          </div>
        </section>

        <section className="case-chapter case-chapter-dark">
          <p className="kicker">01 · Discovery</p>
          <div className="case-chapter-heading">
            <h2>Understanding a workflow spread across people and tools.</h2>
            <p>I mapped how reports moved from an initial request to a published deliverable. Interviews and workflow walkthroughs exposed where context disappeared, decisions stalled, and teams rebuilt work they had already completed.</p>
          </div>
          <div className="case-insights">
            <article><span>01</span><h3>No shared status</h3><p>Teams relied on messages and meetings to understand whether a report was blocked, in review, or ready.</p></article>
            <article><span>02</span><h3>Scattered feedback</h3><p>Comments arrived across documents, email, and chat, making resolution and accountability difficult.</p></article>
            <article><span>03</span><h3>Unclear ownership</h3><p>Authors could not quickly identify who needed to act next or why publishing was being held up.</p></article>
          </div>
        </section>

        <section className="case-section">
          <p className="kicker">People in the system</p>
          <div className="case-section-grid">
            <h2>Three roles, three definitions of progress.</h2>
            <p>Rather than designing around a single “user,” the experience was structured around the distinct responsibilities that shape a report.</p>
          </div>
          <div className="case-personas">
            <article><span>Creates</span><h3>The author</h3><p>Needs a clear brief, reusable source material, and confidence that feedback has been addressed.</p><strong>“Help me move forward without chasing people.”</strong></article>
            <article><span>Guides</span><h3>The reviewer</h3><p>Needs the latest version, focused review requests, and visibility into what changed.</p><strong>“Show me what needs my attention.”</strong></article>
            <article><span>Decides</span><h3>The approver</h3><p>Needs a concise summary, resolved risks, and a dependable record of the decision.</p><strong>“Make readiness easy to trust.”</strong></article>
          </div>
        </section>

        <figure className="case-visual case-visual-warm">
          <img src="/pulse-journey.svg" alt="Journey map from planning through report publishing" />
          <figcaption><span>Journey map</span> Mapping questions, friction, and confidence across the complete publishing experience.</figcaption>
        </figure>

        <section className="case-section case-priorities">
          <p className="kicker">Setting priorities</p>
          <div className="case-section-grid">
            <h2>Turn research into a focused product strategy.</h2>
            <div><p>The research was translated into four experience principles. These became a shared filter for product decisions and prevented the first release from becoming another complicated project-management tool.</p></div>
          </div>
          <ol className="case-priority-list">
            <li><span>01</span><div><h3>Orient before asking for action</h3><p>Every role should understand status, ownership, and the next step at a glance.</p></div></li>
            <li><span>02</span><div><h3>Keep feedback with the work</h3><p>Review conversations belong beside the relevant section and remain visible until resolved.</p></div></li>
            <li><span>03</span><div><h3>Reveal complexity progressively</h3><p>Summaries support quick scanning while details remain available when a decision requires them.</p></div></li>
            <li><span>04</span><div><h3>Make readiness explainable</h3><p>A report is not simply “done”; the system shows what is complete, missing, or waiting.</p></div></li>
          </ol>
        </section>

        <section className="case-impact" aria-label="Project impact">
          <div><strong>1</strong><span>shared workflow</span></div>
          <div><strong>3</strong><span>core roles aligned</span></div>
          <div><strong>0→1</strong><span>design system</span></div>
        </section>

        <section className="case-section">
          <p className="kicker">The challenge</p>
          <div className="case-section-grid">
            <h2>Design for clarity without hiding complexity.</h2>
            <div>
              <p>The product had to support authors, reviewers, and approvers—each with different priorities—while preserving a dependable audit trail.</p>
              <ul className="case-list">
                <li>Make ownership and report status immediately legible.</li>
                <li>Reduce repeated work across authoring and review.</li>
                <li>Turn dense signals into clear decisions and actions.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="case-showcase">
          <div className="case-showcase-copy">
            <p className="kicker">Key improvement</p>
            <h2>A dashboard that answers “what needs me now?”</h2>
            <p>Modular cards combine progress, priority, and ownership. Strong hierarchy helps users scan quickly, while warm orange accents reserve attention for meaningful moments.</p>
          </div>
          <img src="/pulse-cover.svg" alt="Pulse report dashboard interface" />
        </section>

        <section className="case-chapter">
          <p className="kicker">02 · Designing the experience</p>
          <div className="case-chapter-heading">
            <h2>Connect the handoffs instead of adding more process.</h2>
            <p>The solution became a role-aware workspace with one report record, explicit review requests, and a visible path to publication. Each view changes emphasis without changing the underlying source of truth.</p>
          </div>
          <div className="case-feature-grid">
            <article><span>Dashboard</span><h3>Work that needs attention rises first.</h3><p>Priority, due date, ownership, and unresolved feedback are combined into a scannable starting point.</p></article>
            <article><span>Report workspace</span><h3>Creation and review share one context.</h3><p>Structured sections, source references, and anchored feedback reduce version confusion.</p></article>
            <article><span>Approval</span><h3>Decisions become clear and traceable.</h3><p>Readiness checks summarize remaining risks before recording approval and publication.</p></article>
          </div>
        </section>

        <figure className="case-visual case-visual-dark">
          <img src="/pulse-workflow.svg" alt="Connected workflow for authors, reviewers, and approvers" />
          <figcaption><span>Workflow model</span> One shared report supports each role while preserving responsibility and decision history.</figcaption>
        </figure>

        <section className="case-section">
          <p className="kicker">System foundations</p>
          <div className="case-section-grid">
            <h2>A visual language built around state and attention.</h2>
            <div><p>The system uses neutral surfaces for sustained work and warm accents for moments that need action. Reusable patterns cover status, ownership, comments, review requests, approvals, and notifications.</p></div>
          </div>
          <div className="case-system-grid">
            <div><span>Colour</span><div className="case-swatches"><i/><i/><i/><i/><i/></div></div>
            <div><span>Status language</span><ul><li>Draft</li><li>Needs review</li><li>Changes requested</li><li>Ready to publish</li></ul></div>
            <div><span>Core patterns</span><ul><li>Ownership chips</li><li>Anchored comments</li><li>Readiness checks</li><li>Activity history</li></ul></div>
          </div>
        </section>

        <section className="case-chapter case-chapter-orange">
          <p className="kicker">03 · Validation</p>
          <div className="case-chapter-heading">
            <h2>Prototype the moments where confidence breaks.</h2>
            <p>Testing focused on orientation, requesting a review, resolving feedback, and approving a report. Iterations simplified labels, brought ownership into the page header, and separated publishing readiness from overall completion.</p>
          </div>
          <div className="case-test-results">
            <div><strong>4</strong><span>critical journeys prototyped</span></div>
            <div><strong>3</strong><span>rounds of iteration</span></div>
            <div><strong>1</strong><span>shared interaction model</span></div>
          </div>
        </section>

        <section className="case-section case-closing">
          <p className="kicker">Outcome</p>
          <div className="case-section-grid">
            <h2>A system teams can understand, trust, and extend.</h2>
            <div>
              <p>The final direction connects the report journey end to end and establishes reusable patterns for navigation, status, approvals, and notifications. The work also gave the team a scalable foundation for future reporting tools without fragmenting the experience again.</p>
              <a className="case-next" href="/" onClick={(event) => { event.preventDefault(); playProjectBackSound(); onBack() }}>Back to all projects <ArrowUpRight size={20} /></a>
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [activePixelRole, setActivePixelRole] = useState(0)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 24)
  const [sourceSection, setSourceSection] = useState<string | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const interval = window.setInterval(() => setActivePixelRole((current) => (current + 1) % pixelRoles.length), 2000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 24)
    updateScrolledState()
    window.addEventListener('scroll', updateScrolledState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolledState)
  }, [])

  const navigateTo = (path: string, source?: string) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    if (source) setSourceSection(source)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (currentPath !== '/') return
    const sectionIds = ['projects', 'selected-work', 'about', 'blogs', 'contact']
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver((entries) => {
      const visibleSection = entries.find((entry) => entry.isIntersecting)
      if (!visibleSection) return
      setActiveSection(visibleSection.target.id === 'projects' ? '' : visibleSection.target.id === 'selected-work' ? 'projects' : visibleSection.target.id)
    }, { rootMargin: '-24% 0px -64% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [currentPath])

  useEffect(() => {
    document.title = currentPath === '/about' ? 'About — Parinav Badal' : currentPath === '/pulse' ? 'Pulse case study — Parinav Badal' : 'Parinav Badal — Product Designer'
  }, [currentPath])

  useEffect(() => {
    if (currentPath === '/' && sourceSection) {
      setTimeout(() => {
        scrollToSection(sourceSection)
        setSourceSection(null)
      }, 100)
    }
  }, [currentPath, sourceSection])

  useEffect(() => {
    if (currentPath !== '/') return
    let animationFrame = 0
    let burstTimer = 0
    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const target = document.querySelector<HTMLElement>(link.hash)
      if (!target) return
      event.preventDefault()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        target.scrollIntoView({ block: target.id === 'contact' ? 'center' : 'start' })
        window.history.replaceState({}, '', link.hash)
        return
      }
      const beginScroll = () => {
        cancelAnimationFrame(animationFrame)
        const start = window.scrollY
        const targetOffset = target.id === 'selected-work'
          ? 0
          : target.id === 'contact'
            ? (window.innerHeight - target.getBoundingClientRect().height) / 2
            : 84
        const targetY = target.getBoundingClientRect().top + start - targetOffset
        const distance = targetY - start
        const startedAt = performance.now()
        const duration = 1100
        const previousScrollBehavior = document.documentElement.style.scrollBehavior
        document.documentElement.style.scrollBehavior = 'auto'
        const scroll = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1)
          const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - ((-2 * progress + 2) ** 3) / 2
          window.scrollTo(0, start + distance * eased)
          if (progress < 1) animationFrame = requestAnimationFrame(scroll)
          else document.documentElement.style.scrollBehavior = previousScrollBehavior
        }
        window.history.replaceState({}, '', link.hash)
        animationFrame = requestAnimationFrame(scroll)
      }
      if (link.classList.contains('hero-scroll')) {
        if (link.classList.contains('is-bursting')) return
        link.classList.add('is-bursting')
        burstTimer = window.setTimeout(beginScroll, 1150)
        return
      }
      beginScroll()
    }
    document.addEventListener('click', handleAnchorClick)
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(animationFrame)
      window.clearTimeout(burstTimer)
      document.documentElement.style.scrollBehavior = ''
    }
  }, [currentPath])

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>('.section-heading > *, .project, .about-section > .kicker, .about-grid > *, .post, footer > .kicker, .contact-cta-group > h2, .email-link, .about-page-top, .case-study-nav, .case-hero-copy > *, .case-hero-art, .case-section > .kicker, .case-section-grid > *, .case-impact > *, .case-showcase > *, .case-chapter > .kicker, .case-chapter-heading > *, .case-insights > *, .case-personas > *, .case-visual > *, .case-priority-list > *, .case-feature-grid > *, .case-system-grid > *, .case-test-results > *')
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal')
      element.style.setProperty('--reveal-delay', `${(index % 4) * 110}ms`)
    })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-revealed', entry.isIntersecting)
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 })
    revealTargets.forEach((element) => observer.observe(element))

    const workSection = document.querySelector<HTMLElement>('.work-section')
    const colorObserver = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      entry.target.classList.add('is-color-revealed')
      colorObserver.unobserve(entry.target)
    }, { threshold: 0.18 })
    if (workSection) colorObserver.observe(workSection)

    return () => {
      observer.disconnect()
      colorObserver.disconnect()
    }
  }, [currentPath])

  if (currentPath === '/about') return <AboutPage onBack={() => navigateTo('/')} />
  if (currentPath === '/pulse') return <PulseCaseStudy onBack={() => navigateTo('/')} />

  return (
    <main>
      <nav className={`nav-shell ${isScrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
        <a className="monogram" href="#projects" aria-label="Parinav Badal, home">
          <img src={logo} alt="" aria-hidden="true" />
        </a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navigation.map((item) => (
            <a
              className={activeSection === (item === 'Blog' ? 'blogs' : item.toLowerCase()) ? 'active' : ''}
              href={item === 'About' ? '/about' : item === 'Projects' ? '#selected-work' : item === 'Blog' ? '#blogs' : `#${item.toLowerCase()}`}
              onClick={(event) => {
                if (item === 'About') { event.preventDefault(); navigateTo('/about') }
                setActiveSection(item === 'Blog' ? 'blogs' : item.toLowerCase())
                setMenuOpen(false)
              }}
              key={item}
            >{item}</a>
          ))}
        </div>
      </nav>

      <section
        ref={heroRef}
        className="hero"
        id="projects"
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          event.currentTarget.style.setProperty('--hero-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 18}px`)
          event.currentTarget.style.setProperty('--hero-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 18}px`)
        }}
        onPointerLeave={() => {
          heroRef.current?.style.setProperty('--hero-x', '0px')
          heroRef.current?.style.setProperty('--hero-y', '0px')
        }}
      >
        <div className="hero-motion" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-wash" />
        <div className="hero-fluid" aria-hidden="true" />
        <div className="hero-texture" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-name-group">
            <p className="hero-intro">
              <span className="hero-greeting-line" aria-label="Hello, I am">
                <span className="hero-greeting-content" aria-hidden="true">
                  <span className="greeting-window">
                    <span className="greeting-track">
                      {[...greetings, greetings[0]].map((greeting, index) => <span key={`${greeting}-${index}`}>{greeting}</span>)}
                    </span>
                  </span>
                  <span className="greeting-suffix">, I am</span>
                </span>
              </span>
            </p>
            <h1 className="name-arrival name-motion-center" aria-label="Parinav Badal">
              <span className="name-type-content" aria-hidden="true">
                <span className="first-name">Par<span className="accent-i">i</span>nav</span>{' '}
                <em className="surname-mark">Badal<span aria-hidden="true">Badal</span></em>
              </span>
            </h1>
            <div className="hero-bottom">
              <div className="hero-copy-stack">
                <p className="hero-tagline">
                  <span className="tagline-arrival">
                    {heroRoles.map((role, index) => (
                      <span className="tagline-role" key={role}>
                        <span>{role}</span>{index === heroRoles.length - 2 ? ' & ' : index < heroRoles.length - 1 ? ', ' : '.'}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
              <div className={`pixel-role role-${pixelRoles[activePixelRole].label.toLowerCase()}`} aria-live="polite">
                <span className="pixel-canvas" key={pixelRoles[activePixelRole].label} aria-hidden="true">
                  {pixelRoles[activePixelRole].art.join('').split('').map((pixel, index) => <i className={pixel === ' ' ? '' : `tone-${pixel}`} key={index} />)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <a href="#selected-work" className="round-link hero-scroll" aria-label="View selected work">
          <span className="scroll-aquarium" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
          <ArrowDownRight size={24} />
        </a>
      </section>

      <section className="work-section" id="selected-work">
        <header className="section-heading"><h2>Projects</h2><p className="section-intro">A selection of projects made clear through research, prototyping, and close partnership.</p></header>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.title}>
              <a
                className="project-tile"
                href="#contact"
                aria-label={`Preview ${project.title} case study`}
                data-sound-variation="nexus"
                onClick={() => playProjectOpenSound()}
              >
                <img src={project.image} alt="" loading="lazy" />
                <span className="project-card-title" aria-hidden="true">{project.title}</span>
                <span className="project-preview-badge" aria-hidden="true">Private preview</span>
                <span className="project-overlay">
                  <span className="project-overlay-copy">{project.description}</span>
                  <span className="project-tags" aria-hidden="true"><i>B2B</i><i>SaaS</i></span>
                </span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-teaser" id="about">
        <p className="kicker">Who am I</p>
        <div className="about-grid">
          <h2>
            <span className="approach-line"><em className="lived">Lived</em>, <em className="travelled">travelled</em>,</span>
            <span className="approach-line">&amp; <em className="grew">grew</em> among</span>
            <span className="approach-line">diverse cultures,</span>
            <span className="approach-line">people, &amp; societies.</span>
          </h2>
          <div className="about-copy">
            <p>I’m a seasoned product designer who turns ambiguous product questions into clear systems, useful interactions, and stories teams can build around.</p>
            <a className="about-more" href="/about" onClick={(event) => { event.preventDefault(); navigateTo('/about') }}>Read more about me <ArrowUpRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="blogs-section" id="blogs">
        <header className="section-heading compact">
          <h2>Blog</h2>
        </header>
        <div className="post-list">
          {posts.map(([title, subtitle, readTime, date, href], index) => (
            <a href={href} className="post" key={title} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span>0{index + 1}</span><div className="post-copy"><h3>{title}</h3><p>{subtitle}</p></div><p className="post-source"><span className="medium-mark" aria-hidden="true">M</span>{date} · {readTime}</p><ArrowUpRight size={22} /></a>
          ))}
        </div>
      </section>

      <footer id="contact">
        <p className="kicker">
          <span>Building a frontier team</span>
          <span>&amp; AI-native product<span className="contact-question-mark">?</span></span>
        </p>
        <div className="contact-cta-group">
          <h2>Connect with me @</h2>
          <div className="contact-links">
            <a className="email-link" href="https://mail.google.com/mail/?view=cm&fs=1&to=pbadal520@gmail.com" target="_blank" rel="noreferrer"><SiGmail className="contact-logo" aria-hidden="true" />pbadal520@gmail.com <ArrowUpRight size={28} /></a>
            <a className="email-link" href="https://www.linkedin.com/in/parinav-badal-2924ba32/" target="_blank" rel="noreferrer"><FaLinkedin className="contact-logo" aria-hidden="true" />LinkedIn <ArrowUpRight size={28} /></a>
            <a className="email-link back-to-top" href="#projects" aria-label="Back to top"><ArrowUp size={22} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 Parinav Badal</p></div>
      </footer>
    </main>
  )
}

export default App
