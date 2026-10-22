/* =====================================================================
   data.js — ALL OF YOUR CONTENT LIVES HERE. Edit this file, not the HTML.

   Every card uses the same fields, so every expanded card looks the same:
     t      title
     s      subtitle (the small line above the title: venue, year, role ...)
     p      short summary shown on the card
     m      longer description shown when the card is expanded
     tags   2-3 short labels, e.g. ['Python','Qiskit']
     d      detail rows shown when expanded: [['Label','Text'], ...]  (use 2-4 rows)
     href   link shown in the expanded card's top-right corner
     hl     label for that link, e.g. 'GitHub'
            (links starting with http open in a new tab; local pages such as './blog/blog1.html' open in the same tab)
     img    OPTIONAL picture, e.g. 'assets/cards/alpha.jpg'. It slides in, semi-transparent, at the bottom-right
            of the screen while the card is open. Leave it out and nothing appears.

   To add a card: copy any object in a list, paste it after a comma, and edit the text.
   To remove one: delete its { ... } block and the comma next to it.
   ===================================================================== */

/* ---------- SITE: settings used across the page ---------- */
var SITE = {
  limit: 6,                                    // cards each section shows before a "Show all" button appears
  email: 'architpasayat28@gmail.com',                     // shown in the contact section; the contact form sends here
  cv: 'assets/cv.pdf',                         // file the Download CV button opens (put your CV in assets/)
  formspree: '',                               // optional, e.g. 'https://formspree.io/f/xxxxxxx'. Empty = the form opens the visitor's mail app
  links: [                                      // social buttons shown in the hero and the contact section: ['Label', 'URL']
    ['LinkedIn','https://www.linkedin.com/in/archit-pasayat857'],
    ['GitHub','https://github.com/yourname'],
    ['Codeforces','https://codeforces.com/profile/yourname']
  ]
};

/* ---------- L: placeholder paragraph ----------
   Used as the long description (m) of every sample card. Replace each card's m with your own text, then delete L. */
var L = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';


/* ---------- D: ALL YOUR CARDS ----------
   Each key below is one section of the website, and each holds a list of cards. */
var D = {
  /* SKILLS & TOOLS section (id="skills") */
  skills: [
    { t:'Simulation & Design', s:'EDA · Modelling', p:'LTspice, COMSOL, MATLAB and Simulink.', m:L, tags:['LTspice','COMSOL','MATLAB'],
      d:[['Strongest','LTspice'],['Also use','COMSOL, Simulink, Cadence'],['Level','Advanced']], href:'#', hl:'Details' },
    { t:'Programming', s:'Software', p:'Python, C++ and Verilog.', m:L, tags:['Python','C++','Verilog'],
      d:[['Strongest','Python'],['Also use','C++, Verilog, Git'],['Level','Advanced']], href:'#', hl:'Details' },
    { t:'Hardware & Lab', s:'Bench work', p:'Oscilloscope, PCB and microcontrollers.', m:L, tags:['PCB','Arduino','STM32'],
      d:[['Strongest','PCB design'],['Also use','Oscilloscope, soldering'],['Level','Intermediate']], href:'#', hl:'Details' },
    { t:'Quantum & Astro', s:'Scientific computing', p:'Qiskit, Astropy and NumPy.', m:L, tags:['Qiskit','Astropy','NumPy'],
      d:[['Strongest','Astropy'],['Also use','Qiskit, SciPy'],['Level','Intermediate']], href:'#', hl:'Details' }
  ],
  /* RESEARCH INTERESTS section (id="research") */
  research: [
    { t:'Semiconductor Physics', s:'Devices · Band theory', p:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', m:L, tags:['Band theory','Carrier transport','Wide-bandgap'],
      d:[['Focus','Carrier transport in wide-bandgap devices'],['Methods','Simulation, literature review'],['Status','Ongoing']], href:'#', hl:'Notes' },
    { t:'Quantum Mechanics', s:'Theory · Simulation', p:'Sed do eiusmod tempor incididunt ut labore.', m:L, tags:['Schrödinger eq.','Qubits'],
      d:[['Focus','Few-level systems and qubit dynamics'],['Methods','Numerical solvers, Qiskit'],['Status','Ongoing']], href:'#', hl:'Notebook' },
    { t:'Astrophysics', s:'Observation · Data', p:'Ut enim ad minim veniam quis nostrud.', m:L, tags:['Stellar evolution','Spectra'],
      d:[['Focus','Stellar spectra and classification'],['Methods','Astropy, public survey data'],['Status','Ongoing']], href:'#', hl:'Notes' },
    { t:'Electronics & Electrical', s:'Circuits · Power · VLSI', p:'Duis aute irure dolor in reprehenderit.', m:L, tags:['Analog design','Power electronics','VLSI'],
      d:[['Focus','Efficient power conversion'],['Methods','LTspice, bench measurements'],['Status','Ongoing']], href:'#', hl:'Notes' }
  ],
  /* PUBLICATIONS section: papers, preprints, posters */
  publications: [
    { t:'Paper Title One', s:'Journal / Conference · 2025', p:'You, Co-author A, Supervisor B', m:L, tags:['Preprint','Semiconductors'],
      d:[['Role','First author'],['Type','Preprint'],['Year','2025']], href:'#', hl:'Read paper' },
    { t:'Poster Title Two', s:'Symposium · 2024', p:'You, Co-author A', m:L, tags:['Poster','Quantum'],
      d:[['Role','Co-author'],['Type','Poster'],['Year','2024']], href:'#', hl:'View poster' },
    { t:'Report Title Three', s:'Lab report · 2024', p:'You', m:L, tags:['Report','Astrophysics'],
      d:[['Role','Sole author'],['Type','Report'],['Year','2024']], href:'#', hl:'PDF' }
  ],
  /* PROJECTS section: use Problem / Approach / Result rows */
  projects: [
    { t:'Project Alpha', s:'Power electronics', p:'A 12V to 5V buck converter with 94% efficiency.', m:L, tags:['LTspice','Buck converter'],
      d:[['Problem','Why the project exists, in one or two lines.'],['Approach','What you built and the key design decision.'],['Result','Measured numbers, plots or what you learned.']], href:'https://github.com/yourname', hl:'GitHub' },
    { t:'Project Beta', s:'FPGA · Verilog', p:'Lorem ipsum dolor sit amet consectetur.', m:L, tags:['Verilog','Vivado'],
      d:[['Problem','Why the project exists.'],['Approach','What you built.'],['Result','What came out of it.']], href:'https://github.com/yourname', hl:'GitHub' },
    { t:'Project Gamma', s:'Quantum simulation', p:'Excepteur sint occaecat cupidatat.', m:L, tags:['Python','Qiskit'],
      d:[['Problem','Why the project exists.'],['Approach','What you built.'],['Result','What came out of it.']], href:'https://github.com/yourname', hl:'GitHub' },
    { t:'Project Delta', s:'Astro data analysis', p:'Nemo enim ipsam voluptatem quia.', m:L, tags:['Astropy','Spectra'],
      d:[['Problem','Why the project exists.'],['Approach','What you built.'],['Result','What came out of it.']], href:'https://github.com/yourname', hl:'GitHub' }
  ],
  /* EXPERIENCE section: internships, lab work, leadership */
  experience: [
    { t:'Research Intern', s:'Lab / Company · Summer 2025', p:'Worked on lorem ipsum dolor sit amet.', m:L, tags:['Research','Simulation'],
      d:[['Role','Research intern'],['What I did','Short description of your work.'],['Outcome','Result or deliverable.']], href:'#', hl:'Lab page' },
    { t:'Student Club Lead', s:'Club Name · 2023 – now', p:'Led a team of 15 members.', m:L, tags:['Leadership','Events'],
      d:[['Role','Team lead'],['What I did','Short description of your work.'],['Outcome','Result or deliverable.']], href:'#', hl:'Club page' }
  ],
  /* ACHIEVEMENTS section: awards, scholarships, ranks */
  achievements: [
    { t:'Scholarship / Award', s:'Awarding body · 2025', p:'Lorem ipsum dolor sit amet.', m:L, tags:['Award','Merit'],
      d:[['Awarded by','Organisation name'],['Year','2025'],['Reason','Short reason.']], href:'#', hl:'Details' },
    { t:'Contest Rank', s:'Event · 2024', p:'Top X% among N participants.', m:L, tags:['Contest','Ranking'],
      d:[['Event','Event name'],['Year','2024'],['Result','Top X%']], href:'#', hl:'Details' },
    { t:'Hackathon / Olympiad', s:'Event · 2023', p:'Consectetur adipiscing elit.', m:L, tags:['Hackathon','Team'],
      d:[['Event','Event name'],['Year','2023'],['Result','Position or prize']], href:'#', hl:'Details' }
  ],
  /* COMPETITIVE PROGRAMMING section: one card per platform */
  cp: [
    { t:'Codeforces', s:'Expert · 1750', p:'Lorem ipsum dolor sit amet.', m:L, tags:['Graphs','DP','Math'],
      d:[['Max rating','1750'],['Problems solved','600+'],['Contests','120']], href:'https://codeforces.com/profile/yourname', hl:'Profile' },
    { t:'LeetCode', s:'Knight · 2100', p:'Consectetur adipiscing elit.', m:L, tags:['Trees','DP','Greedy'],
      d:[['Contest rating','2100'],['Problems solved','900+'],['Global rank','Top 2%']], href:'https://leetcode.com/yourname', hl:'Profile' },
    { t:'CodeChef', s:'5-star · 2000', p:'Sed do eiusmod tempor.', m:L, tags:['Number theory','Strings'],
      d:[['Max rating','2000'],['Contests','40'],['Best division','Div 1']], href:'https://codechef.com/users/yourname', hl:'Profile' }
  ],
  /* CERTIFICATES section */
  certs: [
    { t:'Certificate One', s:'Issuer · 2025', p:'Lorem ipsum dolor sit.', m:L, tags:['Course','Verified'],
      d:[['Issuer','Organisation name'],['Year','2025'],['Credential ID','XXXX-0000']], href:'#', hl:'Verify' },
    { t:'Certificate Two', s:'Issuer · 2024', p:'Consectetur adipiscing.', m:L, tags:['Course','Verified'],
      d:[['Issuer','Organisation name'],['Year','2024'],['Credential ID','XXXX-0000']], href:'#', hl:'Verify' },
    { t:'Certificate Three', s:'Issuer · 2023', p:'Sed do eiusmod.', m:L, tags:['Course','Verified'],
      d:[['Issuer','Organisation name'],['Year','2023'],['Credential ID','XXXX-0000']], href:'#', hl:'Verify' }
  ],
  /* EDUCATION section: degrees and schooling */
  edu: [
    { t:'B.Tech Electrical Engineering', s:'IIT Bhilai · 2026 – 2030', p:'Lorem ipsum dolor sit amet.', m:L, tags:['Signals','Devices','Power systems'],
      d:[['Institution','IIT Bhilai'],['Duration','2026 – 2030'],['Status','In progress']], href:'#', hl:'University' },
    { t:'B.Tech Electrical Engineering', s:'NIT Durgapur · 2025 – 2026', p:'Lorem ipsum dolor sit amet.', m:L, tags:['Signals','Devices','Power systems'],
      d:[['Institution','NIT Durgapur'],['Duration','2025 – 2026'],['Status','Dropped Out']], href:'#', hl:'University' },
    { t:'Class XII (Science)', s:'School Name · 2026', p:'Physics, Chemistry, Mathematics.', m:L, tags:['PCM','Board exam'],
      d:[['Institution','School Name'],['Duration','2024 – 2026'],['Score','9X%']], href:'#', hl:'School' },
    { t:'Class X', s:'School Name · 2024', p:'Lorem ipsum dolor sit amet.', m:L, tags:['Board exam','Foundations'],
      d:[['Institution','School Name'],['Duration','2022 – 2024'],['Score','9X%']], href:'#', hl:'School' }
  ],
  /* NOTES & BLOG section: short write-ups */
  notes: [
    { t:'How a p–n junction really works', s:'12 Oct 2026 · 5 min read', p:'A plain-English walk through depletion regions.', m:L, tags:['Semiconductors','Explainer'],
      d:[['Topic','Semiconductor physics'],['Published','12 Oct 2026'],['Length','5 min read']], href:'./blog/blog1.html', hl:'Read' },
    { t:'Reading a stellar spectrum', s:'28 Sep 2026 · 6 min read', p:'What absorption lines tell us.', m:L, tags:['Astrophysics','Explainer'],
      d:[['Topic','Astrophysics'],['Published','28 Sep 2026'],['Length','6 min read']], href:'./blog/blog2.html', hl:'Read' },
    { t:'Qubits without the hype', s:'05 Sep 2026 · 7 min read', p:'Superposition, measured honestly.', m:L, tags:['Quantum','Explainer'],
      d:[['Topic','Quantum mechanics'],['Published','05 Sep 2026'],['Length','7 min read']], href:'./blog/blog3.html', hl:'Read' }
  ],
  /* RECOMMENDATIONS section: quotes from professors and supervisors */
  testimonials: [
    { t:'Prof. Firstname Lastname', s:'Professor · University Name', p:'A short, genuine line about working with you.', m:L, tags:['Professor','Research'],
      d:[['Relationship','Course instructor'],['Worked together','2024 – 2025'],['Context','Project or course name']], href:'#', hl:'LinkedIn' },
    { t:'Supervisor Name', s:'Research Supervisor · Lab', p:'Another short line of feedback.', m:L, tags:['Supervisor','Internship'],
      d:[['Relationship','Internship supervisor'],['Worked together','Summer 2025'],['Context','Project name']], href:'#', hl:'LinkedIn' }
  ]
};
