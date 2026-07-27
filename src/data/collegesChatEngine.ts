import { colleges, College, collegeStats } from '@/data/collegesData';

export interface ChatAnswer {
  text: string;
  suggestions?: string[];
}

const normalize = (s: string) => s.toLowerCase().trim();

const findCollege = (query: string): College | undefined => {
  const q = normalize(query);
  return colleges.find((c) => {
    const name = normalize(c.name);
    const short = normalize(c.shortName);
    return (
      q.includes(name) ||
      q.includes(short) ||
      name.includes(q) ||
      short.includes(q) ||
      (q.length > 8 && name.includes(q.slice(0, 12)))
    );
  });
};

const findCollegesByArea = (query: string): College[] => {
  const q = normalize(query);
  return colleges.filter(
    (c) =>
      normalize(c.area).includes(q) ||
      normalize(c.location).includes(q) ||
      q.includes(normalize(c.area))
  );
};

const findCollegesByStatus = (query: string): College[] => {
  const q = normalize(query);
  if (q.includes('government') || q.includes('govt')) {
    return colleges.filter((c) => c.status === 'Government' || c.status === 'Government-Aided');
  }
  if (q.includes('women') || q.includes('girls') || q.includes('ladies')) {
    return colleges.filter((c) => c.forWomen);
  }
  if (q.includes('deemed')) {
    return colleges.filter((c) => c.status === 'Deemed University');
  }
  if (q.includes('autonomous')) {
    return colleges.filter((c) => c.status.includes('Autonomous'));
  }
  if (q.includes('naac a++') || q.includes('a++ grade') || q.includes('a++')) {
    return colleges.filter((c) => c.naacGrade === 'A++');
  }
  if (q.includes('naac a+') || q.includes('a+ grade') || q.includes('a+')) {
    return colleges.filter((c) => c.naacGrade === 'A+');
  }
  return [];
};

const findCollegesByCourse = (query: string): College[] => {
  const q = normalize(query);
  const courseKeywords: { key: string; match: string[] }[] = [
    { key: 'computer science', match: ['computer science', 'cs', 'b.sc cs'] },
    { key: 'biotechnology', match: ['biotech', 'biotechnology'] },
    { key: 'visual communication', match: ['viscom', 'visual communication', 'visual com'] },
    { key: 'psychology', match: ['psychology'] },
    { key: 'microbiology', match: ['microbiology'] },
    { key: 'forensic', match: ['forensic', 'cyber forensic'] },
    { key: 'cyber security', match: ['cyber security', 'cybersecurity'] },
    { key: 'ai', match: ['artificial intelligence', 'ai & ml', 'ai and ml', ' ai '] },
    { key: 'data science', match: ['data science', 'data analytics'] },
    { key: 'animation', match: ['animation', 'vfx'] },
    { key: 'aviation', match: ['aviation'] },
    { key: 'defence studies', match: ['defence studies', 'defense studies'] },
    { key: 'catering', match: ['catering', 'hotel management'] },
    { key: 'costume design', match: ['costume design', 'fashion', 'apparel'] },
    { key: 'mba', match: ['mba', 'business administration'] },
    { key: 'mca', match: ['mca'] },
    { key: 'bba', match: ['bba'] },
    { key: 'bca', match: ['bca'] },
    { key: 'bcom', match: ['b.com', 'bcom', 'commerce'] },
    { key: 'english', match: ['english literature', 'ba english', 'english'] },
    { key: 'mathematics', match: ['mathematics', 'maths'] },
    { key: 'physics', match: ['physics'] },
    { key: 'chemistry', match: ['chemistry'] },
    { key: 'economics', match: ['economics'] },
    { key: 'food science', match: ['food science', 'nutrition', 'home science'] },
  ];

  for (const { key, match } of courseKeywords) {
    if (match.some((m) => q.includes(m))) {
      return colleges.filter((c) =>
        c.courses.some((course) => normalize(course).includes(key))
      );
    }
  }
  return [];
};

const formatCollegeBrief = (c: College): string => {
  return `• ${c.name} (${c.founded}) — ${c.status}, NAAC ${c.naacGrade}${c.nirfRank ? `, NIRF ${c.nirfRank}` : ''}`;
};

export function getAnswer(query: string): ChatAnswer {
  const q = normalize(query);

  // Greetings
  if (/^(hello|hi|hey|good morning|good afternoon|good evening|vanakkam|namaste|hai)/.test(q)) {
    return {
      text: `Hello! Welcome to the Coimbatore Colleges AI Assistant. I can help you explore ${colleges.length} arts and science colleges in Coimbatore. Ask me about:\n\n• Specific colleges (e.g., "Tell me about PSG CAS")\n• Courses (e.g., "Which colleges offer B.Sc Computer Science?")\n• Admissions, fees, placements\n• Colleges by area, type, or NAAC grade\n\nWhat would you like to know?`,
      suggestions: ['List all colleges', 'Best colleges for B.Sc CS', 'Government colleges', 'Women\'s colleges'],
    };
  }

  // Thanks
  if (/(thank|thanks|great|awesome|perfect|got it|cool|nice)/.test(q)) {
    return {
      text: `You're welcome! Feel free to ask about any of the ${colleges.length} colleges, their courses, fees, placements, or admission process. I'm here to help!`,
      suggestions: ['List all colleges', 'Compare top colleges', 'How to apply?'],
    };
  }

  // Stats / overview
  if (q.includes('how many') || q.includes('total') || q.includes('overview') || q.includes('statistics')) {
    return {
      text: `Here's an overview of Coimbatore arts and science colleges:\n\n• Total Colleges: ${collegeStats.total}\n• NAAC A+ / A++ Grade: ${collegeStats.naacAPlus}\n• Autonomous Institutions: ${collegeStats.autonomous}\n• Deemed Universities: ${collegeStats.deemed}\n• Women's Colleges: ${collegeStats.womenColleges}\n• Government / Aided: ${collegeStats.government}\n\nWould you like to explore any category?`,
      suggestions: ['List all colleges', 'NAAC A++ colleges', 'Women\'s colleges', 'Government colleges'],
    };
  }

  // List all colleges
  if ((q.includes('list') || q.includes('all college') || q.includes('show') || q.includes('names')) && q.includes('college')) {
    return {
      text: `Here are all ${colleges.length} colleges:\n\n${colleges.map((c) => formatCollegeBrief(c)).join('\n')}\n\nWhich college would you like to know more about?`,
      suggestions: ['Tell me about PSG CAS', 'Tell me about GRD College', 'Best placement colleges'],
    };
  }

  // Best / top colleges
  if (q.includes('best') || q.includes('top') || q.includes('rank') || q.includes('compare')) {
    if (q.includes('placement') || q.includes('salary') || q.includes('package')) {
      const top = [...colleges]
        .filter((c) => c.placementHighest || c.placementAvg)
        .sort((a, b) => {
          const aHigh = a.placementHighest ? parseInt(a.placementHighest.replace(/[^0-9]/g, '')) || 0 : 0;
          const bHigh = b.placementHighest ? parseInt(b.placementHighest.replace(/[^0-9]/g, '')) || 0 : 0;
          return bHigh - aHigh;
        })
        .slice(0, 8);
      return {
        text: `Top colleges by placement packages:\n\n${top.map((c) => `• ${c.shortName} — Highest: ${c.placementHighest || 'N/A'}, Avg: ${c.placementAvg}`).join('\n')}`,
        suggestions: ['Tell me about PSG CAS', 'Tell me about Rathinam College', 'Colleges with highest placement'],
      };
    }
    if (q.includes('nirf')) {
      const ranked = colleges.filter((c) => c.nirfRank).sort((a, b) => {
        const aNum = parseInt(a.nirfRank || '999');
        const bNum = parseInt(b.nirfRank || '999');
        return aNum - bNum;
      });
      return {
        text: `Colleges with NIRF Rankings:\n\n${ranked.map((c) => `• ${c.shortName} — NIRF ${c.nirfRank}, NAAC ${c.naacGrade}`).join('\n')}`,
        suggestions: ['Tell me about PSG Krishnammal', 'Tell me about PSG CAS', 'NAAC A++ colleges'],
      };
    }
    const topColleges = colleges
      .filter((c) => c.naacGrade === 'A++' || c.nirfRank)
      .sort((a, b) => {
        const aRank = parseInt(a.nirfRank || '999');
        const bRank = parseInt(b.nirfRank || '999');
        return aRank - bRank;
      });
    return {
      text: `Top-rated colleges in Coimbatore:\n\n${topColleges.map((c) => `• ${c.shortName} — NAAC ${c.naacGrade}${c.nirfRank ? `, NIRF ${c.nirfRank}` : ''}`).join('\n')}`,
      suggestions: ['NAAC A++ colleges', 'Best placement colleges', 'Tell me about PSG CAS'],
    };
  }

  // Filter by type
  const typeFiltered = findCollegesByStatus(q);
  if (typeFiltered.length > 0 && !q.includes('tell me about')) {
    const label = q.includes('government') ? 'Government / Aided' :
      q.includes('women') ? "Women's" :
      q.includes('deemed') ? 'Deemed University' :
      q.includes('naac a++') ? 'NAAC A++' :
      q.includes('naac a+') ? 'NAAC A+' :
      'Autonomous';
    return {
      text: `${label} colleges in Coimbatore (${typeFiltered.length} found):\n\n${typeFiltered.map((c) => formatCollegeBrief(c)).join('\n')}`,
      suggestions: ['List all colleges', 'Best colleges for B.Sc CS', 'Tell me about PSG CAS'],
    };
  }

  // Filter by area
  if (q.includes('area') || q.includes('location') || q.includes('near') || q.includes('where')) {
    const areaMatches = findCollegesByArea(q);
    if (areaMatches.length > 0) {
      return {
        text: `Colleges in ${areaMatches[0].area}:\n\n${areaMatches.map((c) => formatCollegeBrief(c)).join('\n')}`,
        suggestions: ['List all colleges', 'Colleges in Peelamedu', 'Colleges in Saravanampatti'],
      };
    }
  }

  // Filter by course
  const courseMatches = findCollegesByCourse(q);
  if (courseMatches.length > 0 && !q.includes('tell me about')) {
    return {
      text: `Colleges offering that course (${courseMatches.length} found):\n\n${courseMatches.map((c) => `• ${c.shortName} — ${c.area}, NAAC ${c.naacGrade}`).join('\n')}`,
      suggestions: ['Tell me about PSG CAS', 'Tell me about AJK College', 'Best placement colleges'],
    };
  }

  // Fees query
  if (q.includes('fee') || q.includes('cost') || q.includes('tuition') || q.includes('how much')) {
    const college = findCollege(query);
    if (college) {
      return {
        text: `${college.name} Fee Structure:\n\n• Fees Range: ${college.feesRange}\n• Per Year: ${college.feesPerYear}\n\nAdmission: ${college.admissionProcess}`,
        suggestions: ['Courses offered', 'Placement details', 'Admission process'],
      };
    }
    return {
      text: `Fees vary widely across colleges:\n\n• Government colleges: ₹1,500 – ₹10,500 (heavily subsidized)\n• Aided streams: ₹2,000 – ₹7,000/year\n• Private autonomous: ₹35,000 – ₹1,40,000/year\n• Deemed universities: ₹40,000 – ₹1,20,000/year\n\nAsk about a specific college for exact fees!`,
      suggestions: ['Tell me about PSG CAS fees', 'Government colleges', 'Most affordable colleges'],
    };
  }

  // Admission process
  if (q.includes('admission') || q.includes('apply') || q.includes('how to join') || q.includes('how to get') || q.includes('register') || q.includes('enroll')) {
    const college = findCollege(query);
    if (college) {
      return {
        text: `${college.name} Admission Process:\n\n${college.admissionProcess}\n\nContact: ${college.phone}\nEmail: ${college.email}\nWebsite: ${college.website}`,
        suggestions: ['Courses offered', 'Fees structure', 'Placement details'],
      };
    }
    return {
      text: `Admission processes vary by college type:\n\n• Government colleges: TNGASA centralized portal, merit-based on 10+2\n• Private autonomous: Direct online application, merit-based on 12th marks\n• Deemed universities: Institutional portal + possible entrance/screening\n• MBA/MCA: TANCET entrance exam required\n\nAsk about a specific college for its admission details!`,
      suggestions: ['Tell me about PSG CAS admission', 'Government colleges', 'How to apply for MBA?'],
    };
  }

  // Placement
  if (q.includes('placement') || q.includes('job') || q.includes('salary') || q.includes('package') || q.includes('recruit') || q.includes('career')) {
    const college = findCollege(query);
    if (college) {
      return {
        text: `${college.name} Placement Details:\n\n• Average Package: ${college.placementAvg}\n${college.placementHighest ? `• Highest Package: ${college.placementHighest}\n` : ''}• Top Recruiters: ${college.topRecruiters.join(', ')}\n\nThe college has a dedicated placement cell that facilitates corporate training and recruitment drives.`,
        suggestions: ['Courses offered', 'Fees structure', 'Best placement colleges'],
      };
    }
    return {
      text: `Placement highlights across top colleges:\n\n• PSG CAS: Avg ₹3.83 LPA, Highest ₹14+ LPA (Deloitte, Goldman Sachs, Google)\n• PSG Krishnammal: Strong MNC placements (Deloitte, TCS, CTS)\n• Rathinam: Highest ₹12 LPA (Infosys, Wipro, Amazon)\n• AJK College: Highest ₹24 LPA (tech services)\n• Sri Krishna ASC: Top conversion record (Deloitte, TCS, Accenture)\n\nAsk about a specific college for detailed placement info!`,
      suggestions: ['Best placement colleges', 'Tell me about PSG CAS', 'Tell me about Rathinam College'],
    };
  }

  // Courses
  if (q.includes('course') || q.includes('program') || q.includes('department') || q.includes('subject') || q.includes('stream') || q.includes('offer')) {
    const college = findCollege(query);
    if (college) {
      return {
        text: `${college.name} Courses:\n\nUG Programs:\n${college.ugCourses.map((c) => `• ${c}`).join('\n')}\n${college.pgCourses.length > 0 ? `\nPG Programs:\n${college.pgCourses.map((c) => `• ${c}`).join('\n')}` : ''}\n\nFees: ${college.feesPerYear}`,
        suggestions: ['Admission process', 'Placement details', 'Fees structure'],
      };
    }
    return {
      text: `We have ${colleges.length} colleges offering diverse courses. You can ask:\n\n• "Which colleges offer B.Sc Computer Science?"\n• "Colleges offering Biotechnology"\n• "Colleges with MBA programs"\n• "Colleges offering Visual Communication"\n\nOr ask about a specific college's courses!`,
      suggestions: ['Colleges offering B.Sc CS', 'Colleges offering Biotechnology', 'Colleges offering MBA'],
    };
  }

  // Facilities
  if (q.includes('facility') || q.includes('facilities') || q.includes('amenities') || q.includes('infrastructure') || q.includes('campus') || q.includes('hostel') || q.includes('library') || q.includes('lab')) {
    const college = findCollege(query);
    if (college) {
      return {
        text: `${college.name} Campus Facilities:\n\n${college.facilities.map((f) => `• ${f}`).join('\n')}\n\nLocation: ${college.location}`,
        suggestions: ['Courses offered', 'Placement details', 'Admission process'],
      };
    }
    return {
      text: `Most colleges in Coimbatore offer modern facilities including:\n\n• Computer & science laboratories\n• Central libraries (some with 70,000+ books)\n• Separate hostels for boys and girls\n• Sports complexes and athletic tracks\n• Auditoriums and seminar halls\n• Cafeterias and food courts\n• Campus Wi-Fi and transport\n\nAsk about a specific college for its facilities!`,
      suggestions: ['Tell me about PSG CAS', 'Tell me about Rathinam College', 'Colleges with hostels'],
    };
  }

  // Contact
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('website') || q.includes('reach')) {
    const college = findCollege(query);
    if (college) {
      return {
        text: `${college.name} Contact:\n\n📍 Location: ${college.location}\n📞 Phone: ${college.phone}\n✉️ Email: ${college.email}\n🌐 Website: ${college.website}\n👤 Principal: ${college.principal}`,
        suggestions: ['Courses offered', 'Admission process', 'Placement details'],
      };
    }
    return {
      text: `I can provide contact details for any of the ${colleges.length} colleges. Just ask "Contact details of [college name]" or "How to reach [college name]".`,
      suggestions: ['Contact PSG CAS', 'Contact GRD College', 'Contact Rathinam College'],
    };
  }

  // Compare two colleges
  if (q.includes('compare') || q.includes('comparison') || q.includes('vs') || q.includes('versus') || q.includes('difference between')) {
    const mentioned = colleges.filter((c) => {
      const name = normalize(c.name);
      const short = normalize(c.shortName);
      return q.includes(short) || q.includes(name) || name.includes(q.slice(0, 12));
    });
    if (mentioned.length >= 2) {
      const [a, b] = mentioned;
      return {
        text: `Comparison: ${a.shortName} vs ${b.shortName}\n\n• Founded: ${a.founded} vs ${b.founded}\n• Status: ${a.status} vs ${b.status}\n• NAAC: ${a.naacGrade} vs ${b.naacGrade}\n${a.nirfRank || b.nirfRank ? `• NIRF: ${a.nirfRank || '—'} vs ${b.nirfRank || '—'}\n` : ''}• Location: ${a.area} vs ${b.area}\n• Fees: ${a.feesPerYear} vs ${b.feesPerYear}\n• Placement Avg: ${a.placementAvg} vs ${b.placementAvg}\n${a.placementHighest || b.placementHighest ? `• Highest: ${a.placementHighest || '—'} vs ${b.placementHighest || '—'}\n` : ''}• UG Courses: ${a.ugCourses.length} vs ${b.ugCourses.length}\n• PG Courses: ${a.pgCourses.length} vs ${b.pgCourses.length}\n\nTop Recruiters:\n${a.shortName}: ${a.topRecruiters.slice(0, 3).join(', ')}\n${b.shortName}: ${b.topRecruiters.slice(0, 3).join(', ')}`,
        suggestions: [`Tell me about ${a.shortName}`, `Tell me about ${b.shortName}`, 'Best placement colleges'],
      };
    }
    return {
      text: `I can compare any two colleges! Just say "Compare PSG CAS and Rathinam College" or "PSG CAS vs GRD College". I'll show you a side-by-side comparison of fees, placements, NAAC grades, and more.`,
      suggestions: ['Compare PSG CAS and Rathinam', 'Compare PSG CAS and GRD College', 'Best placement colleges'],
    };
  }

  // Most affordable / cheapest colleges
  if (q.includes('affordable') || q.includes('cheap') || q.includes('cheapest') || q.includes('low fee') || q.includes('lowest') || q.includes('budget') || q.includes('economical')) {
    const affordable = [...colleges].sort((a, b) => {
      const aFee = parseInt(a.feesPerYear.replace(/[^0-9]/g, '').slice(0, 6)) || 999999;
      const bFee = parseInt(b.feesPerYear.replace(/[^0-9]/g, '').slice(0, 6)) || 999999;
      return aFee - bFee;
    }).slice(0, 8);
    return {
      text: `Most affordable colleges in Coimbatore (by annual fees):\n\n${affordable.map((c) => `• ${c.shortName} — ${c.feesPerYear} (${c.status})`).join('\n')}\n\nGovernment and aided colleges are the most economical options!`,
      suggestions: ['Government colleges', 'Tell me about Govt Arts College', 'Best placement colleges'],
    };
  }

  // Oldest colleges
  if (q.includes('oldest') || q.includes('heritage') || q.includes('legacy') || q.includes('historic')) {
    const oldest = [...colleges]
      .filter((c) => c.founded !== '—' && !isNaN(parseInt(c.founded)))
      .sort((a, b) => parseInt(a.founded) - parseInt(b.founded))
      .slice(0, 8);
    return {
      text: `Oldest colleges in Coimbatore:\n\n${oldest.map((c) => `• ${c.shortName} — Founded ${c.founded}, NAAC ${c.naacGrade}`).join('\n')}\n\nThese institutions have a rich legacy in the region!`,
      suggestions: ['Tell me about Govt Arts College', 'Tell me about NGM College', 'Tell me about Nirmala College'],
    };
  }

  // Specific college detail
  const college = findCollege(query);
  if (college && (q.includes('tell me about') || q.includes('about') || q.includes('detail') || q.includes('info') || q.includes('overview'))) {
    return {
      text: `${college.name}\n\n${college.description}\n\n• Founded: ${college.founded}\n• Status: ${college.status}\n• NAAC: ${college.naacGrade}${college.nirfRank ? `\n• NIRF Rank: ${college.nirfRank}` : ''}\n• Location: ${college.location}\n• Courses: ${college.ugCourses.length} UG${college.pgCourses.length > 0 ? `, ${college.pgCourses.length} PG` : ''}\n• Fees: ${college.feesPerYear}\n• Placement Avg: ${college.placementAvg}${college.placementHighest ? `\n• Highest Package: ${college.placementHighest}` : ''}\n• Principal: ${college.principal}\n\nWould you like to know about courses, fees, placements, or facilities?`,
      suggestions: ['Courses offered', 'Placement details', 'Admission process'],
    };
  }

  // If college name is mentioned but no specific intent, give overview
  if (college) {
    return {
      text: `${college.name}\n\n${college.description}\n\n• Founded: ${college.founded}\n• Status: ${college.status}\n• NAAC: ${college.naacGrade}${college.nirfRank ? `\n• NIRF Rank: ${college.nirfRank}` : ''}\n• Location: ${college.location}\n• Fees: ${college.feesPerYear}\n• Placement: ${college.placementAvg}\n\nWhat would you like to know — courses, fees, placements, admission, or facilities?`,
      suggestions: ['Courses offered', 'Placement details', 'Admission process', 'Facilities'],
    };
  }

  // Fallback
  return {
    text: `I can help you with information about ${colleges.length} arts and science colleges in Coimbatore. Try asking:\n\n• "Tell me about PSG CAS"\n• "Which colleges offer B.Sc Computer Science?"\n• "Best placement colleges"\n• "Government colleges"\n• "Women's colleges"\n• "NAAC A++ colleges"\n• "Compare PSG CAS and Rathinam College"\n• "Most affordable colleges"\n• "Oldest colleges"`,
    suggestions: ['List all colleges', 'Best colleges', 'Compare colleges', 'Most affordable colleges'],
  };
}
