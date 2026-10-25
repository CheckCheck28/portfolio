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
  limit: 4,                                    // cards each section shows before a "Show all" button appears
  email: 'architpasayat28@gmail.com',                     // shown in the contact section; the contact form sends here
  cv: 'assets/cv.pdf',                         // file the Download CV button opens (put your CV in assets/)
  formspree: '',                               // optional, e.g. 'https://formspree.io/f/xxxxxxx'. Empty = the form opens the visitor's mail app
  links: [                                      // social buttons shown in the hero and the contact section: ['Label', 'URL']
    ['LinkedIn','https://www.linkedin.com/in/archit-pasayat857'],
    ['GitHub','https://github.com/CheckCheck28'],
    ['Codeforces','https://codeforces.com/profile/Blaze_Dragon123']
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
    { t:'Programming', s:'Software', p:'Python, C++ and Verilog.', m:L, tags:['Python','C++','Verilog'],
      d:[['Strongest','Python'],['Also use','C++, Verilog, Git'],['Level','Advanced']], href:'#', hl:'Details' },
  ],
  /* RESEARCH INTERESTS section (id="research") */
  research: [
    { t:'Semiconductor Physics', s:'Devices · Band theory', p:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', m:L, tags:['Band theory','Carrier transport','Wide-bandgap'],
      d:[['Focus','Carrier transport in wide-bandgap devices'],['Methods','Simulation, literature review'],['Status','Ongoing']], href:'#', hl:'Notes' },
  ],
  /* PUBLICATIONS section: papers, preprints, posters */
  publications: [
    { t:'Paper Title One', s:'Journal / Conference · 2025', p:'You, Co-author A, Supervisor B', m:L, tags:['Preprint','Semiconductors'],
      d:[['Role','First author'],['Type','Preprint'],['Year','2025']], href:'#', hl:'Read paper' },
  ],
  /* PROJECTS section: use Problem / Approach / Result rows */
  projects: [
    { t:'Project Alpha', s:'Power electronics', p:'A 12V to 5V buck converter with 94% efficiency.', m:L, tags:['LTspice','Buck converter'],
      d:[['Problem','Why the project exists, in one or two lines.'],['Approach','What you built and the key design decision.'],['Result','Measured numbers, plots or what you learned.']], href:'https://github.com/CheckCheck28', hl:'GitHub' },
  ],
  /* EXPERIENCE section: internships, lab work, leadership */
experience: [
    { t:'NIUS Physics Scholar', s:'HBCSE, TIFR Mumbai · Jun 2026', p:'Selected among the top 70 students nationally for the undergraduate physics research camp.', m:'Participated in the prestigious National Initiative on Undergraduate Science (NIUS) Physics camp at the Homi Bhabha Centre for Science Education (TIFR). Selected nationally among the top 70 students to explore advanced physics concepts and research methodologies.', tags:['Physics','Research','TIFR'],
      d:[['Role','Physics Scholar'],['Selection','Top 70 Nationally'],['Location','HBCSE, Mumbai']], href:'https://www.hbcse.tifr.res.in/', hl:'HBCSE Page' },
    { t:'Design & PR Member', s:'OpenLake, IIT Bhilai · Aug 2026 – Present', p:'Managing design and public relations while co-organizing Major League Hacking (MLH) events.', m:'Serving as a Design and Public Relations Member for OpenLake, the open-source club at IIT Bhilai. Responsibilities include co-organizing Major League Hacking (MLH) events, designing promotional materials, and managing public outreach.', tags:['Open Source','Design','MLH'],
      d:[['Role','Design & PR'],['Key Activity','Co-organizing MLH events'],['Institution','IIT Bhilai']], href:'https://openlake.in/', hl:'OpenLake Page' },
    { t:'Junior Coordinator', s:'IEEE Student Branch, NIT Durgapur · Aug 2025 – May 2026', p:'Participated in technical initiatives and secured 2nd place in the Epoch ML hackathon.', m:'Active member of the IEEE Student Branch at NIT Durgapur during my first year. Engaged in technical events and secured second place in the Epoch machine learning hackathon by engineering a Network Intrusion Detection System on the CIC-IoT dataset.', tags:['IEEE','Machine Learning','Cybersecurity'],
      d:[['Role','Junior Coordinator'],['Key Achievement','2nd Place in Epoch Hackathon'],['Institution','NIT Durgapur']], href:'https://www.ieee-nitdgp.in/', hl:'IEEE SB Page' },
    { t:'Member', s:'DesignX, IIT Bhilai · Oct 2026 – Present', p:'Recently joined the design club to explore creative tools and visual communication.', m:'Active member of DesignX, the official design club at IIT Bhilai. Currently exploring design fundamentals, participating in introductory workshops, and preparing to contribute to upcoming campus design projects.', tags:['Design','UI/UX'],
      d:[['Role','Member'],['Status','Newly Joined'],['Institution','IIT Bhilai']], href:'https://culturals.iitbhilai.ac.in/club/designx', hl:'DesignX Page' },
    { t:'Member', s:'Space Exploration Society, IIT Bhilai · Oct 2026 – Present', p:'Engaging with the campus astronomy and space science community.', m:'Recently joined the Space Exploration Society at IIT Bhilai. Looking forward to participating in observation sessions, technical discussions on astrophysics, and connecting with peers interested in space technologies.', tags:['Astronomy','Space'],
      d:[['Role','Member'],['Status','Newly Joined'],['Institution','IIT Bhilai']], href:'#', hl:'SES Page' },
    { t:'Member', s:'Quizotica, IIT Bhilai · Oct 2026 – Present', p:'Participating in campus quizzing events and knowledge-building sessions.', m:'New member of Quizotica, the quizzing club at IIT Bhilai. Engaging in trivia discussions and preparing to participate in upcoming inter-college quizzing competitions.', tags:['Quizzing','Trivia'],
      d:[['Role','Member'],['Status','Newly Joined'],['Institution','IIT Bhilai']], href:'https://culturals.iitbhilai.ac.in/club/quizzotica', hl:'Quizotica Page' }
  ],
  /* ACHIEVEMENTS section: awards, scholarships, ranks */
  achievements: [
    { t:'Contest Rank', s:'Event · 2024', p:'Top X% among N participants.', m:L, tags:['Contest','Ranking'],
      d:[['Event','Event name'],['Year','2024'],['Result','Top X%']], href:'#', hl:'Details' },
  ],
  /* COMPETITIVE PROGRAMMING section: one card per platform */
  cp: [
    { t:'Codeforces', s:'Expert · 1750', p:'Lorem ipsum dolor sit amet.', m:L, tags:['Graphs','DP','Math'],
      d:[['Max rating','1750'],['Problems solved','600+'],['Contests','120']], href:'https://codeforces.com/profile/Blaze_Dragon123', hl:'Profile' },
    { t:'LeetCode', s:'Knight · 2100', p:'Consectetur adipiscing elit.', m:L, tags:['Trees','DP','Greedy'],
      d:[['Contest rating','2100'],['Problems solved','900+'],['Global rank','Top 2%']], href:'https://leetcode.com/u/BlazingGun111/', hl:'Profile' },
    { t:'CodeChef', s:'5-star · 2000', p:'Sed do eiusmod tempor.', m:L, tags:['Number theory','Strings'],
      d:[['Max rating','2000'],['Contests','40'],['Best division','Div 1']], href:'https://www.codechef.com/users/machine_gun135', hl:'Profile' }
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
    { t:'B.Tech in Electrical Engineering', s:'IIT Bhilai · 2026 - 2030', p:'Currently in my first year of undergraduate studies.', m:'Currently pursuing my Bachelor of Technology in Electrical Engineering, and participating in clubs of OpenLake, DesignX, SES and Quizzotica.', tags:[],
      d:[['Institution','Indian Institute of Technology, Bhilai'],['Duration','Jul 2026 - present'],['CGPA','-']], href:'https://iitbhilai.ac.in/', hl:'University', img:'./assets/cards/iitbh.svg' },
    { t:'B.Tech in Electrical Engineering', s:'NIT Durgapur · 2025 - 2026', p:'Completed the first year of the B.Tech program before switching to IIT Bhilai.', m:'Studied the first year of undergraduate coursework in Electrical Engineering, securing a CGPA of 8.97, with an active participation in various club activities of IEEESB-NITD', tags:['DSA','Basics of EE'],
      d:[['Institution','National Institute of Technology, Durgapur'],['Duration','Aug 2025 - May 2026'],['CGPA','8.97']], href:'https://nitdgp.ac.in/', hl:'University', img:'./assets/cards/nitdgp.svg' },
    { t:'Class XII (Science)', s:'KIIT International School · 2025', p:'Completed senior secondary studies with a strong foundation in science and mathematics.', m:'Passed the All India Senior School Certificate Examination (AISSCE) by Central Board of Secondary Education (CBSE) in the Science stream (PCM) with 94.8%. Achieved a percentile of 98.6 in JEE Main 2025 and an All India Rank of ~10,000 in JEE Advanced 2026.', tags:['Physics','Chemistry','Mathematics'],
      d:[['Institution','KIIT International School, Bhubaneswar'],['Duration','2023 - 2025'],['Score','94.8%']], href:'https://kiitis.ac.in/', hl:'School', img:'./assets/cards/kiitis.png' },
    { t:'Class X', s:'DAV Public School · 2023', p:'Completed high school foundational studies with distinction.', m:'Completed the All India Secondary School Examination (AISSE) conducted by Central Board of Secondary Education (CBSE) with a score of 98.4%, securing the 3rd rank in the school.', tags:['Foundations'],
      d:[['Institution','DAV Public School, Chandrasekharpur'],['Duration','2014 - 2023'],['Score','98.4%']], href:'https://davcsp.org/', hl:'School', img:'./assets/cards/davcsp.png' }
  ],
  /* NOTES & BLOG section: short write-ups */
  notes: [
    { t:'How a p-n junction really works', s:'12 Oct 2026 · 5 min read', p:'A plain-English walk through depletion regions.', m:L, tags:['Semiconductors','Explainer'],
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
