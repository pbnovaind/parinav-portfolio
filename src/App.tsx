import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, Menu, X } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
import logo from '../Images/logo.svg'
import aboutImage from '../Images/life2.png'
import pulseHeroImage from '../Images/landingpage.png'
import journeyMapImage from '../Images/JM gsk.svg'
import metricsGskImage from '../Images/1.svg'
import designGskImage from '../Images/designgsk.svg'
import './App.css'
import workshopImage from '../Images/workshop.png'
import thematicAnalysisImage from '../Images/thematic analysis.svg'
import personalFileOneImage from '../Images/p1.svg'
import personalFileTwoImage from '../Images/p2.svg'
import projectThumbOne from '../Images/thumb1.svg'
import projectThumbTwo from '../Images/thumb2.svg'
import projectThumbThree from '../Images/thumb3.svg'
import financeAgentLogo from '../Images/financeagent.svg'
import financeProfileImage from '../Images/finance2.svg'
import microsoft365Image from '../Images/M365.svg'
import designMontageImage from '../Images/Designmontage.svg'
import explorationImage from '../Images/exploration.svg'
import explorationCardOne from '../Images/Card1.svg'
import explorationCardTwo from '../Images/Card2.svg'
import explorationCardThree from '../Images/Card3.svg'
import explorationCardFour from '../Images/Card4.svg'
import cardTestImage from '../Images/Cardtest.svg'
import cardTestTwoImage from '../Images/cardtest2.svg'
import finalPageImage from '../Images/lastpageq.svg'
import financeLaptopImage from '../Images/laptop365.svg'
import workshopM365Image from '../Images/workshopm365.svg'
import surveyVivaImage from '../Images/surveyviva.jpg'
import surveyTwoImage from '../Images/survey2.svg'

const projects = [
  {
    title: 'Arc Studio',
    status: 'Public preview',
    description: 'A collaborative canvas that turns scattered thinking into clear product direction.',
    image: projectThumbOne,
    route: '/arc-studio',
  },
  {
    title: 'Roam',
    status: 'GA',
    description: 'Making the messy work of planning a trip feel fluid, personal, and shared.',
    image: projectThumbTwo,
    route: '/roam',
  },
  {
    title: 'Geni Reporter',
    status: 'GA',
    description: 'A clearer workflow for creating, reviewing, and publishing reports.',
    image: projectThumbThree,
    route: '/pulse',
  },
]

const posts = [
  ['From Exposing What AI Knows to Designing What Humans Need', 'Rethinking AI agent scores, rankings, and signals', '10 min', 'September 2026', 'https://medium.com/@badalparina1/ai-agent-signals-rethinking-ai-scores-rankings-and-what-it-means-for-users-to-trust-system-f14a02dd6120?sharedUserId=badalparina1'],
  ['Conducting Design Thinking Workshop', 'A practical guide to aligning stakeholders through hands-on collaboration', '5 min read', 'August 2023', 'https://medium.com/@uxandyouti/conducting-design-thinking-workshop-for-stakeholders-9fd25b2425e0'],
  ['What Deserves an Interruption?', 'Deciding what should trigger a notification - and what should simply live on the dashboard.', '5 min', 'January 2026', '#contact'],
]

const navigation = ['Projects', 'About', 'Blog', 'Contact']
const heroRoles = ['Designer', 'Mentor', 'CFI Cyclist', 'Motorsports Enthusiast']
const greetings = ['Hello', 'नमस्ते', 'வணக்கம்', 'నమస్కారం', 'नमस्कार', 'Bonjour', 'Hola', 'Ciao', 'Hallo', 'Olá']
const explorationCards = [
  { src: explorationCardOne, label: 'Directly fill best possible?' },
  { src: explorationCardTwo, label: 'List AI + past records in drop down ?', accent: true },
  { src: explorationCardThree, label: 'Show available agent logic' },
  { src: explorationCardFour, label: 'Let system throw an error and avoid guess work?' },
]

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
  return (
    <main className="about-page-shell">
      <section className="about-section about-page" id="about">
        <div className="about-page-top">
          <a className="about-back" href="/" onClick={(event) => { event.preventDefault(); onBack() }}>
            <ArrowLeft size={18} /> Back
          </a>
          <p>Parinav Badal / About</p>
        </div>
        <div className="about-grid">
          <div className="about-copy scroll-reveal is-revealed">
            <h1 className="about-life-title">Life</h1>
            <>
                <p>I have lived, travelled, and grown up in motion. Domestically, I have lived in Purnia, Delhi, Bhuvaneshwar, Hyderabad, Chennai, and Bangalore. New places, people, and cultures became so normal that change almost feels like built-in DNA.</p>
                
                <p>With limited exposure to the world outside, Hollywood movie CDs became my first window into the outside world, haha. Eventually, watching was not enough, so I wanted to travel and see it myself.</p>
                
                
                <p>Since then, curiosity has taken me through design, studio photography and travel. I've travelled across 22 of India's 28 states and 5 of its 8 Union Territories, mostly on a motorcycle—a love since 10th standard. I've also travelled through Kenya, Tanzania and Mauritius, usually choosing roads and public transport over tourist itineraries. I like seeing how people live, getting a little lost, and figuring out what it feels like to belong somewhere. I'm also a CFI cyclist, with races including the HCL Cyclothon and Pedal for the Planet.</p>
                
                <p>And somewhere between all the moving, I learnt to cook and bake—because when life keeps changing your address, you might as well know how to make your own comfort food.</p>

            </>
          </div>
          <div className="about-collage scroll-reveal is-revealed">
            <img src={aboutImage} alt="A collage showing travel, cycling, road trips, landscapes, and wildlife" />
          </div>
        </div>
      </section>
    </main>
  )
}

export function PulseCaseStudy({ onBack }: { onBack: () => void }) {
  return (
    <main className="case-study-shell">
      <header className="case-study-nav">
        <a className="about-back" href="/" onClick={(event) => { event.preventDefault(); onBack() }}>
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

type CaseStudyContent = {
  title: string
  summary: string
  role: string
  timeline: string
  team: string[]
  landscape: Record<string, string[]>
  friction: string[]
  opportunities: string[]
  opportunityDetails?: { title: string; body: string }[]
  metrics: string[]
  workshop: string[]
  priorities: Record<string, string[]>
  assets: string[]
  assetImages?: string[]
  heroImage?: string
  phases: string[]
}

const caseStudies: Record<string, CaseStudyContent> = {
  '/arc-studio': {
    title: 'Arc Studio', summary: 'A collaborative canvas for turning scattered thinking into clear product direction.', role: 'Lead Product Designer', timeline: '14 weeks · Discovery to beta', team: ['Product designer', 'Product manager', '2 engineers', 'Research partner'],
    landscape: { 'Business Focus': ['Increase planning confidence', 'Reduce alignment meetings'], 'User Intent': ['Find the signal quickly', 'Make a decision together'], 'System Boundaries': ['Workspace and permissions', 'Comments and decision history'], 'Design Strategy': ['Progressive disclosure', 'Shared source of truth'] },
    friction: ['Teams entered planning with fragmented context.', 'Decisions disappeared across documents and meetings.', 'People could not tell what needed attention next.'], opportunities: ['Create one visible planning canvas.', 'Bring evidence beside the decision it supports.', 'Make ownership and momentum legible.'], metrics: ['94% Adoption', '88 SUS Score', '31% Faster alignment'], workshop: ['People needed orientation before contribution.', 'The most valuable artifact was a shared decision record.', 'Templates helped teams start without prescribing the answer.'], priorities: { 'Must Have': ['Canvas navigation', 'Decision history', 'Role permissions'], 'Should Have': ['Reusable templates', 'Comment mentions', 'Activity digest'], 'Could Have': ['Presentation mode', 'Calendar sync'], "Won't Have": ['Full project management', 'Automated strategy writing'] }, assets: ['Workspace overview', 'Decision canvas', 'Review state', 'Activity history'], phases: ['Phase 1 · Establish the canvas and decision record', 'Phase 2 · Expand templates and team rituals', 'Horizon · Connect planning signals across portfolios'] },
  '/roam': {
    title: 'Roam', summary: 'A calmer way for distributed teams to plan complex travel together.', role: 'Product Designer', timeline: '10 weeks · Research to launch', team: ['Product designer', 'Founder', 'Operations lead', '3 engineers'],
    landscape: { 'Business Focus': ['Increase repeat planning', 'Lower support overhead'], 'User Intent': ['Compare options together', 'Keep plans flexible'], 'System Boundaries': ['Itineraries and collaboration', 'Bookings remain external'], 'Design Strategy': ['Shared visibility', 'Confidence through context'] },
    friction: ['Plans lived in chat threads and spreadsheets.', 'Trade-offs were hard to compare as a group.', 'Last-minute changes created duplicate work.'], opportunities: ['Give every trip one flexible home.', 'Make alternatives easy to compare.', 'Keep changes visible without noise.'], metrics: ['91% Weekly Retention', '82 SUS Score', '42% Fewer support requests'], workshop: ['People planned around constraints, not destinations.', 'A useful comparison needed time, cost, and confidence together.', 'Shared edits required a clear activity rhythm.'], priorities: { 'Must Have': ['Trip overview', 'Shared itinerary', 'Change history'], 'Should Have': ['Option comparison', 'Saved places', 'Smart reminders'], 'Could Have': ['Local recommendations', 'Offline mode'], "Won't Have": ['In-app booking', 'Social discovery feed'] }, assets: ['Trip overview', 'Option comparison', 'Collaborative itinerary', 'Change summary'], phases: ['Phase 1 · Make the shared itinerary dependable', 'Phase 2 · Add comparison and planning intelligence', 'Horizon · Support multi-trip planning for teams'] },
  '/pulse': {
    title: 'Simplifying report creation', summary: 'Making complex reporting easier to modify, collaborate on, and move from first draft to final delivery.', role: 'Product Designer - E2E', timeline: '12 weeks · Discovery to handoff', team: ['3 front-end developers', '1 senior developer', '1 project manager', '1 product owner'], heroImage: pulseHeroImage,
    landscape: { 'Business Focus': ['Reduce report production time', 'Improve delivery consistency'], 'User Intent': ['Know what to do next', 'Create with confidence'], 'System Boundaries': ['Briefs, drafts, and review', 'Publishing stays with the team'], 'Design Strategy': ['Make progress visible', 'Reduce cognitive load'] },
    friction: ['Report creation was spread across disconnected tools.', 'People had to repeat the same work across planning and production.', 'The team could not easily tell what was ready, blocked, or missing.'], opportunities: ['Bring the report workflow into one clear workspace.', 'Make ownership and progress visible at a glance.', 'Turn scattered feedback into focused next steps.'], opportunityDetails: [{ title: 'Bringing the report workflow into one clear workspace.', body: 'Make it easier for users to create, review, and manage reports without switching between multiple places.' }, { title: 'Making report accuracy easier to maintain.', body: 'Give users better visibility and control over data, changes, and validation to reduce errors and improve confidence in reports.' }, { title: 'Making reporting faster and easier to complete.', body: 'Reduce unnecessary steps and simplify complex tasks so users can create and finalize reports more efficiently.' }], metrics: ['3000+ Reports supported', '3 Core workflows', '92.5% Task success', '85.6 SUS Score'], workshop: ['Improve report creation speed — Reduce manual steps and time needed to generate reports.', 'Improve data accuracy & GxP compliance — Ensure reports are reliable, validated, and meet regulatory requirements.', 'Simplify collaboration & review — Make it easier for teams to work together, provide feedback, and finalize reports.', 'Reduce manual work — Automate repetitive tasks and minimize dependency on manual user actions.', 'Make reports easier to find and navigate — Help users quickly access relevant reports, data, and insights.', 'Support flexible report creation — Enable templates and customization for different business and user needs.', 'Improve product performance & reliability — Ensure the experience is fast, stable, and dependable at scale.'], priorities: { 'Must Have': ['Clear report brief', 'Structured authoring', 'Review and approval states'], 'Should Have': ['Reusable report templates', 'Role-based views', 'Activity history'], 'Could Have': ['Smart content suggestions', 'Custom workflow rules'], "Won't Have": ['A general project-management tool', 'Automated decisions without review'] }, assets: ['Report overview', 'Design montage', 'Review workspace', 'Publishing flow'], assetImages: ['/pulse-cover.svg', '/pulse-journey.svg', '/pulse-workflow.svg', '/pulse-cover.svg'], phases: ['Phase 1 · Simplify the report brief and creation flow', 'Phase 2 · Connect review, feedback, and approval', 'Horizon · Extend the system across enterprise reporting'] },
}

function CaseStudyPage({ content, onBack }: { content: CaseStudyContent; onBack: () => void }) {
  const [showCaseTop, setShowCaseTop] = useState(false)
  const [openWorkshop, setOpenWorkshop] = useState<'workshop1' | 'workshop2' | 'journeyMap' | 'personalFiles' | null>(null)
  const [activePersonalFile, setActivePersonalFile] = useState(0)
  const priorityColumns = Object.entries(content.priorities)
  const workshopTwoColumns: [string, string[]][] = content.title === 'Simplifying report creation'
    ? [
        ['Project & Timeline', ['Project visibility', 'Planning & coordination', 'Timeline management']],
        ['Team Management', ['Team collaboration', 'Resource allocation']],
        ['Role Mapping', ['Role swap', 'Role visibility']],
        ['Report Output', ['Data accuracy & validation', 'Review & approval', 'Output flexibility']],
      ]
    : priorityColumns
  const caseAssets = content.title === 'Simplifying report creation'
    ? [{ name: 'Identified journey map', image: journeyMapImage }]
    : content.assets.map((name, index) => ({ name, image: content.assetImages?.[index] }))

  useEffect(() => {
    const updateCaseTop = () => setShowCaseTop(window.scrollY > window.innerHeight * 4)
    updateCaseTop()
    window.addEventListener('scroll', updateCaseTop, { passive: true })
    return () => window.removeEventListener('scroll', updateCaseTop)
  }, [])

  useEffect(() => {
    if (!openWorkshop) return
    const previousBodyOverflow = document.body.style.overflow
    const previousDocumentOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenWorkshop(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousDocumentOverflow
    }
  }, [openWorkshop])

  return (
    <main className={`portfolio-case-study ${content.title === 'Simplifying report creation' ? '' : 'portfolio-case-study-neutral'}`}>
      <header className="case-template-nav"><a className="about-back" href="/" aria-label="Back to projects" onClick={(event) => { event.preventDefault(); playProjectBackSound(); onBack() }}><ArrowLeft size={18} aria-hidden="true" /></a></header>
      <article>
        <section className={`case-template-hero ${content.title === 'Simplifying report creation' ? 'case-template-hero-pulse' : ''}`} aria-labelledby="case-title">
          <div>{content.title !== 'Simplifying report creation' && <p className="case-eyebrow">Enterprise product · UX case study</p>}<h1 id="case-title">{content.title}</h1><p className="case-template-summary">{content.summary}</p></div>
          <div className="case-hero-visual-wrap"><div className={`case-dashboard-placeholder ${content.heroImage ? 'has-hero-image' : ''}`} aria-label={content.heroImage ? `${content.title} landing page` : 'Placeholder for a browser or dashboard mockup'}>{content.heroImage ? <img src={content.heroImage} alt={`${content.title} landing page preview`} /> : <><div className="placeholder-toolbar"><i /><i /><i /><span>product.workspace / overview</span></div><div className="placeholder-layout"><div /><div><b /><b /><b /></div></div></>}</div></div>{content.title === 'Simplifying report creation' && <div className="case-hero-pills" aria-label="Product areas"><span>Lab Reports</span><span>Generative AI</span><span>Pharma</span><span>B2B</span></div>}{content.heroImage && <span className="case-hero-image-caption">TCS X GSK 2024</span>}
        </section>

        <section className="case-meta-strip" aria-label="Project details"><dl><div><dt>My role</dt><dd>{content.role}</dd></div><div><dt>Timeline</dt><dd>{content.timeline}</dd></div><div><dt>Team</dt><dd>{content.team.map((member) => <span key={member}>{member}</span>)}</dd></div></dl></section>

        <section className="case-template-section case-background-investment" aria-labelledby="background-title">
          {content.title === 'Simplifying report creation' ? <><div className="case-background-column"><h2 className="case-problem-title" id="background-title">Problem</h2><p>Business noticed <strong>declining adoption</strong> highlighting gaps in report workflows, and accuracy along with speed of reporting. Stakeholders needed better solution to <strong>support further investment</strong> focused on addressing gaps.</p><p className="problem-risk-note">Without sufficient traction and user adoption by Q4 2024, the product risked being discontinued. Despite being in development since 2020, it had not yet demonstrated enough value to justify sustained investment.</p></div><div className="case-background-column"><h2 className="case-investment-title">Opportunity</h2><ol><li>Identify user groups and design scalable workflows for <strong>report creation</strong>, <strong>collaboration</strong>, and modification, improving UX and SUS scores.</li></ol></div></> : <><div className="case-background-column"><h2 className="case-problem-title" id="background-title">Problem</h2><ul>{content.friction.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="case-background-column"><h2 className="case-investment-title">Opportunity</h2><ol>{content.opportunities.map((item) => <li key={item}>{item}</li>)}</ol></div></>}
        </section>

        <section className="case-template-section" aria-labelledby="opportunity-title"><div className="case-section-label">Opportunity breakdown</div><h2 id="opportunity-title">Three vectors shaped the solution.</h2><div className="case-opportunity-grid">{(content.opportunityDetails ?? content.opportunities.map((title) => ({ title, body: 'Design the smallest useful intervention that makes this behavior visible, understandable, and repeatable.' }))).map((opportunity) => <article key={opportunity.title}><h3>{opportunity.title}</h3><p>{opportunity.body.replace('multiple places', 'multiple tools')}</p></article>)}</div></section>

        {content.title === 'Simplifying report creation' && <section className="case-metrics" aria-label="Impact and improvements"><img src={metricsGskImage} alt="Post redesign impact and improvements" /></section>}

        {content.title === 'Simplifying report creation' && <section className="case-design-montage" aria-labelledby="design-montage-title"><h2 id="design-montage-title"><span>Design</span>{' '}<span>Montage</span></h2></section>}

        <section className="case-template-section case-workshop-section" aria-labelledby="workshop-title"><div className="case-section-label-row"><div className="case-section-label">Workshop 1</div></div><h2 id="workshop-title"><span className="workshop-heading-accent">What</span> do we solve?</h2><p className="case-workshop-description">{content.title === 'Simplifying report creation' ? 'Planned the discovery workshop to align stakeholders, engineering, and solution architecture on priorities, limitations, scope, and project debrief.' : 'A focused workshop to align the team on the problem, priorities, and direction.'}</p><div className="case-workshop-actions"><button className="case-workshop-button case-workshop-cta case-workshop-cta-orange" type="button" onClick={() => setOpenWorkshop('workshop1')}><Maximize2 size={12} aria-hidden="true" /><span>View workshop</span></button>{content.title === 'Simplifying report creation' && <><button className="case-workshop-button case-workshop-cta case-workshop-cta-persona" type="button" onClick={() => { setActivePersonalFile(0); setOpenWorkshop('personalFiles') }}><span>Persona</span><Maximize2 size={12} aria-hidden="true" /></button><button className="case-workshop-button case-workshop-cta case-workshop-cta-persona" type="button" onClick={() => setOpenWorkshop('journeyMap')}><span>Journey map</span><Maximize2 size={12} aria-hidden="true" /></button></>}</div><div className="case-workshop-grid">{content.workshop.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item.split(' — ')[0]}</p></article>)}</div></section>

        <section className="case-template-section case-workshop-section" aria-labelledby="workshop-2-title"><div className="case-section-label-row"><div className="case-section-label">Workshop 2</div></div><h2 id="workshop-2-title"><span className="workshop-heading-accent">How</span> do we solve?</h2><p className="case-workshop-description">{content.title === 'Simplifying report creation' ? 'A second workshop aligned stakeholders on the features and functions to prioritize in the designs.' : 'A collaborative working session to turn priorities into practical product decisions.'}</p><button className="case-workshop-button case-workshop-cta case-workshop-cta-orange" type="button" onClick={() => setOpenWorkshop('workshop2')}><Maximize2 size={12} aria-hidden="true" /><span>View workshop</span></button><div className="case-moscow-grid">{workshopTwoColumns.map(([heading, items]) => <div key={heading}><h3>{heading}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></section>

          {content.title !== 'Simplifying report creation' && <section className="case-template-section" aria-labelledby="designs-title"><div className="case-section-label-row"><div className="case-section-label">Core interactive designs</div></div><h2 id="designs-title">A flexible visual language for the moments that matter.</h2><div className="case-assets-grid">{caseAssets.map(({ name, image }) => <figure key={name}><div className="case-asset-placeholder">{image ? <img src={image} alt={`${name} interface`} /> : <><span>Interface placeholder</span><i /><i /><i /></>}</div><figcaption>{name}</figcaption></figure>)}</div></section>}

        <section className="case-template-section case-priorities-section" aria-labelledby="release-title"><h2 id="release-title">Setting Priorities</h2><div className="case-priorities-board">{content.title === 'Simplifying report creation' ? <><article><em>Recommendations</em><p>post UX evaluation &amp; user research.</p><h3>Tech</h3><ul><li>Defining role &amp; responsibility of Approver, reviewer &amp; co-author.</li><li>Linking Spotfire with RR.</li><li>Linking VOD with RR for seamless approval and edit process.</li><li>Tool access for external (FDA, Vendor) &amp; internal users.</li><li>Anatomy for GenAI prompts for more user control on generated content.</li></ul><h3>Design</h3><ul><li>Document tray: loading all potential docs in advance to be utilized.</li><li>Report initiation process.</li><li>Archive of old reports.</li><li>Ability to quick access reports.</li><li>Improved overall UI of tool.</li><li>Refined dashboard view.</li><li>Dashboard widget for team allocation and tasks.</li><li>Personalized menu, sub-menu &amp; suggestions for respective team.</li><li>Correct taxonomy &amp; nomenclature.</li><li>Improve user control for notifications.</li></ul></article><article><em>Final design action plan</em><h3>Priority 1</h3><ul><li>Role mapping: Author, co-author, Reviewer &amp; Approver.</li><li>Report Creation Journey.</li><li>Template Creation Journey.</li><li>Version Control &amp; edits.</li><li>Template metadata settings.</li><li>Charts &amp; image import settings.</li><li>Email Notifications.</li></ul><h3>Priority 2</h3><ul><li>Approval process.</li><li>Admin control.</li></ul></article></> : Object.entries(content.priorities).slice(0, 2).map(([heading, items]) => <article key={heading}><em>{heading}</em><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>

        {content.title === 'Simplifying report creation' && <><section className="case-key-improvements" aria-labelledby="key-improvements-title"><h2 id="key-improvements-title">Key Improvements</h2></section><section className="case-design-gsk" aria-label="GSK design system"><img src={designGskImage} alt="GSK design system screens" /></section></>}

        <footer className="case-template-footer"><button className="case-footer-back" type="button" onClick={onBack}>Go back to projects <ArrowLeft size={16} aria-hidden="true" /></button></footer>
      </article>
      <button className={`case-back-to-top ${showCaseTop ? 'is-visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUp size={20} aria-hidden="true" />
      </button>
      {openWorkshop && <div className="case-image-popover" role="dialog" aria-modal="true" aria-labelledby="workshop-image-title" onClick={() => setOpenWorkshop(null)}><div className={`case-image-popover-panel ${openWorkshop === 'personalFiles' ? 'case-personal-files-panel' : ''}`} onClick={(event) => event.stopPropagation()}><div className="case-image-popover-header"><p id="workshop-image-title">{openWorkshop === 'workshop1' ? 'Workshop 1' : openWorkshop === 'workshop2' ? 'Thematic analysis' : openWorkshop === 'journeyMap' ? 'Journey map' : 'Based on 5 interviews, 2 groups were identified'}</p><button type="button" aria-label="Close image popover" onClick={() => setOpenWorkshop(null)}><X size={20} /></button></div>{openWorkshop === 'personalFiles' ? <><div className="case-image-popover-images"><img src={activePersonalFile === 0 ? personalFileOneImage : personalFileTwoImage} alt={`Personal file ${activePersonalFile + 1}`} /></div><div className="case-image-popover-controls"><button type="button" aria-label="Show previous personal file" onClick={() => setActivePersonalFile((current) => (current + 1) % 2)}><ChevronLeft size={22} /></button><span>{activePersonalFile + 1} / 2</span><button type="button" aria-label="Show next personal file" onClick={() => setActivePersonalFile((current) => (current + 1) % 2)}><ChevronRight size={22} /></button></div></> : <img src={openWorkshop === 'workshop1' ? workshopImage : openWorkshop === 'journeyMap' ? journeyMapImage : thematicAnalysisImage} alt={openWorkshop === 'workshop1' ? 'Design thinking workshop materials and collaboration' : openWorkshop === 'journeyMap' ? 'Journey map showing the reporting experience' : 'Thematic analysis workshop'} />}</div></div>}
    </main>
  )
}

function ArcStudioFigmaPage({ onBack }: { onBack: () => void }) {
  const [openArcImage, setOpenArcImage] = useState<'workshop' | 'landscape' | 'research' | null>(null)
  const [researchTab, setResearchTab] = useState<'questions' | 'post'>('questions')
  const [showArcTop, setShowArcTop] = useState(false)
  const sections = [
    { label: '01 / Overview', title: 'Invoice', accent: 'Extraction & Automation', body: 'AI-powered invoice processing that automates extraction, validation, and processing for Finance & Accounting.', image: financeLaptopImage, className: 'arc-figma-hero' },
    { label: '02 / My role', title: 'Product Designer', body: 'Customer interview & research synthesis\nDesign prototype\nProduct demo video', image: financeAgentLogo, className: 'arc-figma-role' },
    { label: '03 / Opportunity', title: 'Opportunity', body: '', image: financeLaptopImage, className: 'arc-figma-opportunity' },
    { label: '04 / Impact', title: 'Impact', body: 'Post redesign', image: financeProfileImage, className: 'arc-figma-impact' },
    { label: '05 / Design Montage', title: 'Design Montage', body: 'Exhausting tokens...', image: designMontageImage, className: 'arc-figma-montage' },
    { label: '07 / Customer research', title: 'Conducting workshop for alignment...', body: '', image: workshopM365Image, className: 'arc-figma-research' },
    { label: '08 / Design decisions', title: 'Survey with AP clerks and customers', body: 'Key design decisions 1', image: surveyVivaImage, className: 'arc-figma-decisions' },
    { label: '09 / Exploration', title: 'Key design decision 1', body: "When the AI agent can't find a match, the AI agent should?",
      image: explorationImage, className: 'arc-figma-exploration' },
    { label: '10 / Exploration', title: 'Key design decision 2', body: <>Using TRIAD voting to resolve <strong>edge cases at scale</strong> and uncertainty, ensuring a timely release in a Mid-Fi, vibe-coded option before investing time in uncertain scenarios.</>, image: explorationImage, className: 'arc-figma-exploration' },
    { label: '11 / Final design', title: 'Key design decision 3', body: <>Can customers <strong>test Invoice</strong> against a sample?</>, image: cardTestImage, className: 'arc-figma-exploration' },
    { label: '12 / Launch', title: 'M365 Copilot', accent: 'June 2026', body: 'M365 Finance Agent for Invoice processing in Public preview', image: finalPageImage, className: 'arc-figma-launch' },
  ]

  useEffect(() => {
    if (!openArcImage) return
    const previousBodyOverflow = document.body.style.overflow
    const previousDocumentOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenArcImage(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousDocumentOverflow
    }
  }, [openArcImage])

  useEffect(() => {
    const updateArcTopVisibility = () => setShowArcTop(window.scrollY > window.innerHeight * 3)
    updateArcTopVisibility()
    window.addEventListener('scroll', updateArcTopVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateArcTopVisibility)
  }, [])

  return (
    <main className="arc-figma-page">
      <header className="arc-figma-nav"><button type="button" onClick={onBack} aria-label="Back to projects"><ArrowLeft size={18} /></button></header>
      <article>
        {sections.map((section) => (
          section.className === 'arc-figma-role' ? (
            <section className="arc-figma-section arc-figma-role" key={section.label}>
              <div className="arc-role-overview">
                <div><span>My role</span><h1>Product Designer</h1><p>Customer interview &amp; research synthesis<br />Design prototype<br />Product demo video</p></div>
                <div><span>Team</span><h2>5</h2><p>1 Principal PM<br />1 Product Designer<br />1 Principal Engineering Manager<br />3 Software engineers</p></div>
                <div><span>Timeline</span><h2>16 weeks</h2><p>Kickoff to design handoff<br /><span className="arc-role-detail-muted">Shipped in 2 phases</span></p></div>
              </div>
              <div className="arc-role-tools"><div className="arc-tool-grid"><div><strong>VS Code</strong><span>Prototype &amp;<br />handoff</span></div><div><strong>Figma</strong><span>Iteration &amp;<br />MCP lookup</span></div><div><strong>MS Clarity</strong><span>User testing<br />&amp; Heatmaps</span></div><div><strong>Viva Engage</strong><span>Customer survey and<br />feedback sessions</span></div></div></div>
            </section>
          ) : section.className === 'arc-figma-opportunity' ? (
            <section className="arc-figma-section arc-figma-opportunity" key={section.label}>
              <div className="arc-opp-col">
                <h1>Opportunity</h1>
                <ul><li>Accelerate financial period close</li><li>Leverage service agents</li><li>Achieve 100%~ Invoice Touchless rate</li></ul>
                <p>Make Finance Agent in M365 the go-to destination for invoice processing &amp; financial period close and accelerate paid seats and adoption.</p>
              </div>
              <div className="arc-opp-col">
                <h1>Design Challenge</h1>
                <ul><li>Investigate customer pain</li><li>Assess existing capabilities and gaps.</li><li>Define feature scope &amp; scenario</li></ul>
                <p>Identify where users struggle today, understand how existing capabilities and service agents can address those gaps, and define the right scenarios for <strong>automation, human-in-the-loop intervention, and decision-making.</strong></p>
              </div>
            </section>
          ) : section.className === 'arc-figma-impact' ? (
            <section className="arc-figma-section arc-figma-impact" key={section.label}>
              <div className="arc-impact-grid">
                <ImpactMetric value={95} format={(v) => `${Math.round(v)}%`} suffix="~" label="Invoice Touch-less rate" note="Compared to 5% ~ in PowerApps for semi structure invoices" />
                <ImpactMetric value={2.5} format={(v) => v.toFixed(1)} suffix="minutes" label="Average invoice processing time" note="Compared to 10 minutes in PowerApps for complex and unstructured documents" />
                <ImpactMetric value={14} format={(v) => `${Math.round(v)}+M`} label="Paid seats in M365" note="Thanks to accelerated clerks & finance user adoption" />
              </div>
              <div className="arc-impact-head">
                <h1>Impact</h1>
                <p>Private preview June 2026</p>
              </div>
            </section>
          ) : section.className === 'arc-figma-montage' ? (
            <section className="arc-figma-section arc-figma-montage" key={section.label}>
              <ol className="arc-process-strip">
                {[
                  { step: 'Discovery workshop', sub: 'Stakeholder alignment' },
                  { step: 'Customer Research', sub: 'Viva engage survey\nAdmin Interview' },
                  { step: 'Road map workshop', sub: 'Moscow framework' },
                  { step: 'Design Iteration on preview', sub: 'Design prototype\nEVALs tracking' },
                  { step: 'Private preview', sub: 'Shipped in 2 phase' },
                ].map(({ step, sub }, i, arr) => (
                  <li key={step} className="arc-process-item" style={{ '--i': i } as CSSProperties}>
                    <span className="arc-process-text"><span className="arc-process-step">{step}</span><span className="arc-process-sub">{sub}</span></span>
                    {i < arr.length - 1 && <ArrowRight className="arc-process-arrow" size={20} strokeWidth={1.5} />}
                  </li>
                ))}
              </ol>
              <img src={section.image} alt="" />
            </section>
          ) : section.className === 'arc-figma-research' ? (
            <section className="arc-figma-section arc-figma-research" key={section.label}>
              <div className="arc-research-copy">
                <h1>Conducting workshop for <span className="arc-research-accent">alignment...</span></h1>
                <span className="arc-research-almost">almost</span>
                <div className="arc-research-actions">
                  <button className="arc-research-view-button" type="button" onClick={() => setOpenArcImage('workshop')}><Maximize2 size={14} aria-hidden="true" /><span>View workshop</span></button>
                  <button className="arc-research-view-button" type="button" onClick={() => setOpenArcImage('landscape')}><Maximize2 size={14} aria-hidden="true" /><span>View landscape</span></button>
                </div>
              </div>
              <div className="arc-research-visual">
                <div className="arc-research-outcomes">
                  <h2>Outcome of workshop</h2>
                  <div className="arc-research-cards">
                    <span>Focus on semi-structured invoices as the primary target</span>
                    <span>Improve PO number extraction across ERPs and emails</span>
                    <span>Prioritise invoices that need human attention</span>
                    <span>Enable admin approval of high-value invoices</span>
                    <span>Identify and prevent recurring vendor-specific errors</span>
                    <span>Inconsistent vendor invoice templates</span>
                  </div>
                </div>
              </div>
            </section>
          ) : section.className === 'arc-figma-workshop' ? (
            <section className="arc-figma-section arc-figma-workshop" key={section.label}>
              <h1 className="arc-landscape-title">landscape ...</h1>
              <div className="arc-landscape-grid">
                <div className="arc-landscape-col">
                  <h2 className="arc-landscape-head arc-landscape-business">Business</h2>
                  <p>At the broader organizational level, Power Apps and <strong>other Microsoft teams had already invested</strong> in agentic capabilities <strong>for invoice processing</strong> and document intelligence. With M365 serving 15M+ paid seats, there was a clear opportunity to bring these capabilities closer to Finance &amp; Accounting users and make invoice processing more accessible within M365 and leverage Microsoft ecosystem.</p>
                </div>
                <div className="arc-landscape-col">
                  <h2 className="arc-landscape-head arc-landscape-design">Design</h2>
                  <p>I had to <strong>decide feature scope &amp; scenario</strong> within a rapidly evolving M365 and AI landscape—<strong>aligning</strong> with partner <strong>on emerging capabilities</strong>, identifying where we could leverage existing patterns, and making early bets on what Finance Agent should enable.</p>
                </div>
                <div className="arc-landscape-col">
                  <h2 className="arc-landscape-head arc-landscape-product">Product</h2>
                  <p>PMs were navigating a fragmented product landscape—with capabilities spread across Microsoft platforms and ERP systems, multiple teams investing in overlapping use cases, and different dependencies shaping what could be delivered. The key product question was <strong>what Finance Agent should own, leverage, or scale</strong> while staying focused on the needs of M365.</p>
                </div>
              </div>
            </section>
          ) : section.className === 'arc-figma-launch' ? (
            <section className="arc-figma-section arc-figma-launch" key={section.label}>
              <div className="arc-launch-art">
                <img className="arc-launch-lastpage" src={section.image} alt="M365 Finance Agent project folder" />
              </div>
            </section>
          ) : (
            <section className={`arc-figma-section ${section.className} ${typeof section.title === 'string' && /^Key design decision [123]$/.test(section.title) ? 'arc-key-decisions-gradient' : ''}`} key={section.label}>
              <div className="arc-figma-copy">{section.className !== 'arc-figma-hero' && section.className !== 'arc-figma-decisions' && <span>{section.label}</span>}{section.className === 'arc-figma-hero' && <img className="arc-finance-agent" src={financeAgentLogo} alt="Finance Agent" />}{(() => {
                const match = typeof section.title === 'string' ? section.title.match(/^(.*?)(\d+)$/) : null
                return match ? (
                  <h1>{match[1]} <span className="arc-decision-number">{match[2]}</span></h1>
                ) : (
                  <h1>{section.title}{section.accent && <><br /><em>{section.accent.split(' & ').map((part, index) => <span key={part}>{index > 0 && <small className="arc-ampersand">&amp;</small>}{part}</span>)}</em></>}</h1>
                )
              })()}{section.className !== 'arc-figma-decisions' && !((section.className === 'arc-figma-exploration') && section.title === 'Key design decision 1') && <p>{section.body}</p>}{(section.className === 'arc-figma-exploration') && section.title === 'Key design decision 1' && <p className="arc-ai-agent-copy">When the <span className="arc-ai-agent-hl">AI</span> <span className="arc-ai-agent-hl">agent</span> can't find a match, it <span className="arc-ai-agent-hl">should</span><span className="arc-ai-agent-hl">?</span></p>}{section.className === 'arc-figma-decisions' && <button className="arc-research-view-button" type="button" onClick={() => setOpenArcImage('research')}><Maximize2 size={14} aria-hidden="true" /><span>View research</span></button>}{section.className === 'arc-figma-hero' && <img className="arc-m365-mark" src={microsoft365Image} alt="Microsoft 365" />}</div>
              {section.className === 'arc-figma-decisions' ? <div className="arc-customer-research-visual">
                <div className="arc-research-outcomes">
                  <div className="arc-research-cards">
                    <span>Focus on semi-structured invoices as the primary target</span>
                    <span>Improve PO number extraction across ERPs and emails</span>
                    <span>Prioritise invoices that need human attention</span>
                    <span>Enable admin approval of high-value invoices</span>
                    <span>Identify and prevent recurring vendor-specific errors</span>
                    <span><s>Inconsistent vendor invoice templates</s> — <strong>Out of scope</strong></span>
                  </div>
                </div>
                <img src={surveyTwoImage} alt="Customer research survey" />
                <p className="arc-chart-takeaway"><strong>Key takeaway:</strong> Most users manually search and correct PO numbers, highlighting an opportunity to design clearer UI actions for reviewing and correcting extraction errors.</p>
              </div> : section.className === 'arc-figma-exploration' && section.title === 'Key design decision 1' ? <div className="arc-exploration-visual" aria-label="Exploration card concepts">
                <div className="arc-exploration-cards">
                  {explorationCards.map((card, index) => (
                    <div key={card.label} className={`arc-exploration-card ${card.accent ? 'is-accent' : ''}`} style={{ '--card-index': index } as CSSProperties}>
                      {card.accent && (
                        <>
                          <span className="arc-exploration-check" aria-label="Selected option">✓</span>
                          <span className="arc-exploration-hover-tag">Scalable for future feature swap and actions.</span>
                        </>
                      )}
                      <img src={card.src} alt={`Exploration card ${index + 1}`} />
                      <p>{card.label}</p>
                    </div>
                  ))}
                </div>
              </div> : section.title === 'Key design decision 3' ? <div className="arc-exploration-visual arc-final-decision-visual" aria-label="Final design card concepts">
                <div className="arc-exploration-cards arc-final-decision-cards">
                  <div className="arc-final-decision-option">
                    <img src={cardTestImage} alt="Card test concept" />
                    <p>For a particular field or row?</p>
                  </div>
                  <div className="arc-final-decision-card arc-final-decision-card-selected">
                    <span className="arc-final-decision-check" aria-label="Selected card">✓</span>
                    <span className="arc-final-decision-note">Viable for loading shimmer and tenet token numbers</span>
                    <img src={cardTestTwoImage} alt="Card test secondary concept" />
                    <p>Against entire invoice in workspace view?</p>
                  </div>
                </div>
              </div> : <img src={section.image} alt="" />}
            </section>
          )
        ))}
        <section className="arc-figma-section arc-figma-more" aria-label="More on in-person work">
          <div className="arc-more-content">
            <p>Thanks! More details in person</p>
            <button className="case-footer-back" type="button" onClick={onBack}>Go back to projects <ArrowLeft size={16} aria-hidden="true" /></button>
          </div>
        </section>
      </article>
      {openArcImage && <div className="arc-research-image-popover" role="dialog" aria-modal="true" aria-label={openArcImage === 'workshop' ? 'Workshop image' : openArcImage === 'landscape' ? 'Landscape content' : 'Customer research survey'} onClick={() => setOpenArcImage(null)}><div className={`arc-research-image-panel ${openArcImage === 'landscape' ? 'arc-landscape-drawer' : openArcImage === 'research' ? 'arc-survey-drawer' : ''}`} onClick={(event) => event.stopPropagation()}><button className="arc-research-image-close" type="button" aria-label="Close image" onClick={() => setOpenArcImage(null)}><X size={20} /></button>{openArcImage === 'landscape' ? <><h2>Landscape</h2><div className="arc-landscape-drawer-grid"><div><h3>Business</h3><p>At the broader organizational level, Power Apps and other Microsoft teams had already invested in agentic capabilities for invoice processing and document intelligence. With M365 serving 15M+ paid seats, there was a clear opportunity to bring these capabilities closer to Finance &amp; Accounting users.</p></div><div><h3>Design</h3><p>I had to decide feature scope and scenario within a rapidly evolving M365 and AI landscape, aligning with partners on emerging capabilities and identifying where we could leverage existing patterns.</p></div><div><h3>Product</h3><p>PMs were navigating a fragmented product landscape, with capabilities spread across Microsoft platforms and ERP systems. The key question was what Finance Agent should own, leverage, or scale.</p></div></div></> : openArcImage === 'research' ? <><div className="arc-survey-tabs" role="tablist" aria-label="Customer research views"><button type="button" role="tab" aria-selected={researchTab === 'questions'} className={researchTab === 'questions' ? 'is-active' : ''} onClick={() => setResearchTab('questions')}>Questions</button><button type="button" role="tab" aria-selected={researchTab === 'post'} className={researchTab === 'post' ? 'is-active' : ''} onClick={() => setResearchTab('post')}>Post</button></div>{researchTab === 'questions' ? <ol className="arc-survey-questions"><li>What is your role and responsibility?</li><li>How many invoices do you process in a typical day?</li><li>Which part of invoice processing takes the most time?</li><li>How often do you manually enter or correct invoice information?</li><li>Where do you usually find the PO number?</li><li>How often do you encounter an incorrect or missing PO number?</li><li>What do you do when the PO number is incorrect?</li><li>What are the most common reasons for PO/invoice matching failures?</li><li>How much time do you spend resolving PO/invoice mismatches?</li><li>How often do vendors use inconsistent invoice formats?</li><li>How do you prioritize invoices that need attention?</li><li>How valuable would automated invoice extraction, PO matching be?</li></ol> : <img src={surveyVivaImage} alt="Customer research survey post" />}</> : <img src={workshopM365Image} alt="Workshop alignment board" />}</div></div>}
      {showArcTop && <button className="arc-figma-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={20} /></button>}
    </main>
  )
}

function ImpactMetric({ value, format, suffix, label, note }: { value: number; format: (v: number) => string; suffix?: string; label: string; note: string }) {
  return (
    <div className="arc-impact-metric">
      <div className="arc-impact-figure"><strong>{format(value)}</strong>{suffix && <span>{suffix}</span>}</div>
      <p className="arc-impact-label">{label}</p>
      <p className="arc-impact-note">{note}</p>
    </div>
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
    document.title = currentPath === '/about' ? 'About — Parinav Badal' : caseStudies[currentPath] ? `${caseStudies[currentPath].title} case study — Parinav Badal` : 'Parinav Badal — Product Designer'
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
    const revealTargets = document.querySelectorAll<HTMLElement>('.section-heading > *, .project, .about-section > .kicker, .about-grid > *, .post, footer > .kicker, .contact-cta-group > h2, .email-link, .about-page-top, .case-study-nav, .case-hero-copy > *, .case-hero-art, .case-section > .kicker, .case-section-grid > *, .case-impact > *, .case-showcase > *, .case-chapter > .kicker, .case-chapter-heading > *, .case-insights > *, .case-personas > *, .case-visual > *, .case-priority-list > *, .case-feature-grid > *, .case-system-grid > *, .case-test-results > *, .case-template-hero > *, .case-template-section > *, .case-template-footer > *, .case-opportunity-grid > *, .case-workshop-grid > *, .case-moscow-grid > *, .case-assets-grid > *, .case-release-list > *, .case-team-list > *, .case-design-montage h2, .arc-figma-copy:not(.arc-figma-final .arc-figma-copy), .arc-figma-section > img:not(.arc-figma-final > img), .arc-launch-art, .arc-exploration-cards, .arc-figma-montage, .arc-role-overview > *, .arc-tool-grid > *, .arc-opp-col > *, .arc-impact-head > *, .arc-impact-metric, .arc-landscape-title, .arc-landscape-col, .arc-research-copy > *, .arc-research-visual')
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
  if (currentPath === '/arc-studio') return <ArcStudioFigmaPage onBack={() => navigateTo('/')} />
  if (caseStudies[currentPath]) return <CaseStudyPage content={caseStudies[currentPath]} onBack={() => navigateTo('/')} />

  return (
    <main>
      <nav className={`nav-shell ${isScrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`} aria-label="Primary navigation">
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
        <header className="section-heading"><h2>Projects</h2><p className="section-intro">A curated selection of my work. Due to NDA restrictions, additional details and case studies are available to discuss in person.</p></header>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.title}>
              <a
                className="project-tile"
                href={project.route}
                aria-label={`View ${project.title} case study`}
                data-sound-variation="nexus"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  playProjectOpenSound()
                  navigateTo(project.route, 'selected-work')
                }}
              >
                <img src={project.image} alt="" loading="lazy" />
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
            <a href={href === '#contact' ? undefined : href} className={`post ${href === '#contact' ? 'is-inactive' : ''}`} key={title} aria-disabled={href === '#contact' || undefined} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span>0{index + 1}</span><div className="post-copy"><h3>{title}</h3><p>{subtitle}</p></div><p className="post-source"><span className="medium-mark" aria-hidden="true">M</span>{date} · {readTime}</p><ArrowUpRight size={22} /></a>
          ))}
        </div>
      </section>

      <footer id="contact">
        <p className="kicker">
          <span>Building a frontier team or</span>
          <span>an AI-native product<span className="contact-question-mark">?</span></span>
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
