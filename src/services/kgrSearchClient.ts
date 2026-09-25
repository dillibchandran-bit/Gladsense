export interface KgrItem {
  kw: string;
  vol: number;
  ait: number;
  kgr: number;
  category: string;
  intent?: string;
}

export function searchKgrClientSide(query: string): KgrItem[] {
  const q = query.trim();
  const lower = q.toLowerCase();

  const isJobQuery = /jobs?|hiring|walk[- ]?in|career|openings?|fresher|salary|internship|recruitment|engineer|developer|analyst|manager|vacancy|vacancies/i.test(lower);
  const isRealEstate = /apartment|flat|rent|plot|villa|sq ?ft|property|housing|real estate|pg /i.test(lower);
  const isEducation = /college|school|university|admission|exam|syllabus|cutoff|degree|course|gpa|scholarship|fees/i.test(lower);
  const isCivic = /visa|passport|license|title|permit|certificate|apostille|dmv|court|legal|tax|form/i.test(lower);
  const isFoodOrBaking = /recipe|bread|cake|dough|hydration|baking|flour|sourdough|cooking/i.test(lower);
  const isCalculatorOrFormula = /calculator|ratio|formula|volume|density|mixing|sqft|epoxy|resins?|concrete|amp hour|offset smoker/i.test(lower);

  let category = 'General';
  let templates: Array<{ suffix: string; vol: number; ait: number; intent: string }>;

  if (isJobQuery) {
    category = 'Careers & Jobs';
    templates = [
      { suffix: '', vol: 210, ait: 9, intent: 'Exact Target Query' },
      { suffix: 'for freshers', vol: 190, ait: 8, intent: 'Entry level applicants' },
      { suffix: 'walk in interview dates', vol: 150, ait: 5, intent: 'Direct hiring events' },
      { suffix: 'salary package details', vol: 230, ait: 12, intent: 'Compensation benchmark' },
      { suffix: 'with immediate joining', vol: 120, ait: 4, intent: 'Urgent recruitment' },
    ];
  } else if (isRealEstate) {
    category = 'Real Estate';
    templates = [
      { suffix: '', vol: 220, ait: 11, intent: 'Exact Target Query' },
      { suffix: 'price per square foot current rate', vol: 180, ait: 7, intent: 'Pricing lookup' },
      { suffix: 'for rent without brokerage direct owner', vol: 240, ait: 14, intent: 'Zero broker search' },
      { suffix: 'verified owner contact details', vol: 160, ait: 6, intent: 'Direct seller connection' },
    ];
  } else if (isEducation) {
    category = 'Education & Exams';
    templates = [
      { suffix: '', vol: 240, ait: 12, intent: 'Exact Target Query' },
      { suffix: 'eligibility criteria and cutoff marks', vol: 190, ait: 8, intent: 'Admission requirements' },
      { suffix: 'fee structure and scholarship details', vol: 210, ait: 9, intent: 'Tuition planning' },
      { suffix: 'syllabus and preparation guide pdf', vol: 170, ait: 6, intent: 'Study resource' },
    ];
  } else if (isCivic) {
    category = 'Civic & Legal';
    templates = [
      { suffix: '', vol: 210, ait: 10, intent: 'Exact Target Query' },
      { suffix: 'required documents checklist step by step', vol: 180, ait: 7, intent: 'Document verification' },
      { suffix: 'online application processing time and fees', vol: 220, ait: 9, intent: 'Fee and timeline' },
      { suffix: 'official portal application status check', vol: 170, ait: 6, intent: 'Status tracking' },
    ];
  } else if (isFoodOrBaking) {
    category = 'Food Science';
    templates = [
      { suffix: '', vol: 230, ait: 11, intent: 'Exact Target Query' },
      { suffix: 'baker percentage formula step by step', vol: 180, ait: 7, intent: 'Recipe consistency' },
      { suffix: 'hydration ratio and temperature guide', vol: 160, ait: 6, intent: 'Fermentation control' },
      { suffix: 'grams to ounces conversion table', vol: 210, ait: 9, intent: 'Measurement conversion' },
    ];
  } else if (isCalculatorOrFormula) {
    category = 'Tools & Calculation';
    templates = [
      { suffix: '', vol: 220, ait: 10, intent: 'Exact Target Query' },
      { suffix: 'step by step calculation formula', vol: 190, ait: 8, intent: 'Formula explanation' },
      { suffix: 'online free accurate estimator', vol: 240, ait: 13, intent: 'Interactive tool query' },
      { suffix: 'ratio mixing chart and safety margin', vol: 170, ait: 7, intent: 'Safety ratio guide' },
    ];
  } else {
    templates = [
      { suffix: '', vol: 210, ait: 10, intent: 'Exact Target Query' },
      { suffix: 'for beginners step by step', vol: 170, ait: 7, intent: 'Beginner tutorial' },
      { suffix: 'complete checklist and requirements', vol: 150, ait: 5, intent: 'Preparation list' },
      { suffix: 'verified guide and tips', vol: 180, ait: 8, intent: 'Best practices' },
    ];
  }

  return templates.map((t, idx) => {
    const kw = t.suffix ? `${q} ${t.suffix}` : q;
    const kgr = Number((t.ait / t.vol).toFixed(3));
    return {
      kw,
      vol: t.vol,
      ait: t.ait,
      kgr,
      category: idx === 0 ? `${category} (Target)` : category,
      intent: t.intent,
    };
  });
}
