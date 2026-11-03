// ---------- Critical care / severity ----------
K('qsofa','qSOFA (quick SOFA)','Sepsis','Seymour CW et al. JAMA 2016; Singer M et al. (Sepsis-3) JAMA 2016','Bedside screen for poor outcome in suspected infection outside ICU',[['Respiratory rate ≥22/min',1],['Altered mentation (GCS <15)',1],['Systolic BP ≤100 mmHg',1]],[[0,'Low risk (<2). Not a diagnostic criterion for sepsis.'],[2,'≥2: high risk of poor outcome — assess for organ dysfunction (SOFA), escalate care.']],'qSOFA is a prognostic prompt, not a substitute for SOFA or clinical judgment.');
P('news2','NEWS2 (National Early Warning Score 2)','Severity / Early warning','Royal College of Physicians, NEWS2, 2017','Track-and-trigger early warning of deterioration',[
['Respiratory rate',[['≤8',3],['9–11',1],['12–20',0],['21–24',2],['≥25',3]]],
['SpO2 (Scale 1)',[['≤91%',3],['92–93%',2],['94–95%',1],['≥96%',0]]],
['Air or oxygen',[['Air',0],['Supplemental oxygen',2]]],
['Systolic BP',[['≤90',3],['91–100',2],['101–110',1],['111–219',0],['≥220',3]]],
['Pulse',[['≤40',3],['41–50',1],['51–90',0],['91–110',1],['111–130',2],['≥131',3]]],
['Consciousness',[['Alert',0],['New confusion / V / P / U',3]]],
['Temperature (°C)',[['≤35.0',3],['35.1–36.0',1],['36.1–38.0',0],['38.1–39.0',1],['≥39.1',2]]]],
[[0,'0–4: low clinical risk (a single parameter scoring 3 = low–medium: urgent ward review).'],[5,'5–6: MEDIUM risk — urgent response by clinician/critical-care outreach.'],[7,'≥7: HIGH risk — emergency response, consider critical care.']],'Use SpO2 Scale 2 (88–92% target) for hypercapnic respiratory failure patients per RCP guidance.');
P('mews','MEWS (Modified Early Warning Score)','Severity / Early warning','Subbe CP et al. QJM 2001','Early warning score for ward patients',[
['Systolic BP',[['≤70',3],['71–80',2],['81–100',1],['101–199',0],['≥200',2]]],
['Heart rate',[['<40',2],['41–50',1],['51–100',0],['101–110',1],['111–129',2],['≥130',3]]],
['Respiratory rate',[['<9',2],['9–14',0],['15–20',1],['21–29',2],['≥30',3]]],
['Temperature (°C)',[['<35',2],['35–38.4',0],['≥38.5',2]]],
['AVPU',[['Alert',0],['Reacts to Voice',1],['Reacts to Pain',2],['Unresponsive',3]]]],
[[0,'<5: lower risk.'],[5,'≥5: increased risk of death / ICU admission — urgent review.']]);
P('saps2','SAPS II','Severity / Organ failure','Le Gall JR, Lemeshow S, Saulnier F. JAMA 1993','ICU severity score and predicted hospital mortality (worst values, first 24 h)',[
['Age (y)',[['<40',0],['40–59',7],['60–69',12],['70–74',15],['75–79',16],['≥80',18]]],
['Heart rate',[['<40',11],['40–69',2],['70–119',0],['120–159',4],['≥160',7]]],
['Systolic BP',[['<70',13],['70–99',5],['100–199',0],['≥200',2]]],
['Temperature',[['<39 °C',0],['≥39 °C',3]]],
['PaO2/FiO2 (only if ventilated or CPAP)',[['Not ventilated/CPAP',0],['≥200 mmHg',6],['100–199',9],['<100',11]]],
['Urine output (L/24 h)',[['≥1.0',0],['0.5–0.999',4],['<0.5',11]]],
['Serum urea (BUN mg/dL)',[['<28',0],['28–83',6],['≥84',10]]],
['WBC (×10³/mm³)',[['<1.0',12],['1.0–19.9',0],['≥20',3]]],
['Potassium (mmol/L)',[['<3.0',3],['3.0–4.9',0],['≥5.0',3]]],
['Sodium (mmol/L)',[['<125',5],['125–144',0],['≥145',1]]],
['Bicarbonate (mmol/L)',[['<15',6],['15–19',3],['≥20',0]]],
['Bilirubin (mg/dL)',[['<4.0',0],['4.0–5.9',4],['≥6.0',9]]],
['GCS',[['14–15',0],['11–13',5],['9–10',7],['6–8',13],['<6',26]]],
['Chronic disease',[['None',0],['Metastatic cancer',9],['Hematologic malignancy',10],['AIDS',17]]],
['Type of admission',[['Scheduled surgical',0],['Medical',6],['Unscheduled surgical',8]]]],
t=>{const l=-7.7631+0.0737*t+0.9971*Math.log(t+1);return `Predicted hospital mortality ≈ ${(100/(1+Math.exp(-l))).toFixed(1)}% (logit = −7.7631 + 0.0737·S + 0.9971·ln(S+1)).`},'Original 1993 calibration; may over/under-predict in modern cohorts.');
P('mods','MODS (Marshall Multiple Organ Dysfunction Score)','Severity / Organ failure','Marshall JC et al. Crit Care Med 1995','Quantifies organ dysfunction in 6 systems',[
['PaO2/FiO2',[['>300',0],['226–300',1],['151–225',2],['76–150',3],['≤75',4]]],
['Creatinine (µmol/L)',[['≤100',0],['101–200',1],['201–350',2],['351–500',3],['>500',4]]],
['Bilirubin (µmol/L)',[['≤20',0],['21–60',1],['61–120',2],['121–240',3],['>240',4]]],
['Pressure-adjusted HR (HR×CVP/MAP)',[['≤10',0],['10.1–15',1],['15.1–20',2],['20.1–30',3],['>30',4]]],
['Platelets (×10³/µL)',[['>120',0],['81–120',1],['51–80',2],['21–50',3],['≤20',4]]],
['GCS',[['15',0],['13–14',1],['10–12',2],['7–9',3],['≤6',4]]]],
[[0,'0: ICU mortality ~0%.'],[1,'1–4: ~1–2%.'],[5,'5–8: ~3–5%.'],[9,'9–12: ~25%.'],[13,'13–16: ~50%.'],[17,'17–20: ~75%.'],[21,'21–24: ~100% (original cohort).']]);
P('four','FOUR score (Full Outline of UnResponsiveness)','Neurology','Wijdicks EF et al. Ann Neurol 2005','Coma scale usable in intubated patients',[
['Eye response',[['Eyelids remain closed with pain',0],['Eyelids closed but open to pain',1],['Eyelids closed but open to loud voice',2],['Eyelids open but not tracking',3],['Eyelids open or opened, tracking, or blinking to command',4]]],
['Motor response',[['No response to pain or generalized myoclonus status',0],['Extension response to pain',1],['Flexion response to pain',2],['Localizing to pain',3],['Thumbs-up, fist, or peace sign',4]]],
['Brainstem reflexes',[['Absent pupil, corneal and cough reflex',0],['Pupil and corneal reflexes absent',1],['Pupil or corneal reflexes absent',2],['One pupil wide and fixed',3],['Pupil and corneal reflexes present',4]]],
['Respiration',[['Breathes at ventilator rate or apnea',0],['Breathes above ventilator rate',1],['Not intubated, irregular breathing',2],['Not intubated, Cheyne–Stokes pattern',3],['Not intubated, regular breathing pattern',4]]]],
t=>`FOUR ${t}/16. Lower = deeper coma; 0 requires brain-death evaluation consideration.`);
P('bps','Behavioral Pain Scale (BPS)','Sedation / Pain','Payen JF et al. Crit Care Med 2001','Pain in sedated, ventilated adults',[
['Facial expression',[['Relaxed',1],['Partially tightened (brow lowering)',2],['Fully tightened (eyelid closing)',3],['Grimacing',4]]],
['Upper limbs',[['No movement',1],['Partially bent',2],['Fully bent with finger flexion',3],['Permanently retracted',4]]],
['Compliance with ventilation',[['Tolerating movement',1],['Coughing but tolerating most of the time',2],['Fighting ventilator',3],['Unable to control ventilation',4]]]],
[[3,'3: no pain.'],[4,'4–5: mild discomfort.'],[6,'>5: significant pain — treat (target BPS ≤5).']]);
K('icdsc','ICDSC (Intensive Care Delirium Screening Checklist)','Delirium','Bergeron N et al. Intensive Care Med 2001','Delirium screening over an 8–24 h shift',[['Altered level of consciousness (not due to recent sedation)',1],['Inattention',1],['Disorientation',1],['Hallucination, delusion or psychosis',1],['Psychomotor agitation or retardation',1],['Inappropriate speech or mood',1],['Sleep/wake cycle disturbance',1],['Symptom fluctuation',1]],[[0,'0: no delirium.'],[1,'1–3: subsyndromal delirium.'],[4,'≥4: DELIRIUM.']]);
P('murray','Murray Lung Injury Score','Respiratory','Murray JF et al. Am Rev Respir Dis 1988','Severity of acute lung injury (use all 4 components)',[
['Chest X-ray: quadrants with consolidation',[['None',0],['1',1],['2',2],['3',3],['4',4]]],
['PaO2/FiO2',[['≥300',0],['225–299',1],['175–224',2],['100–174',3],['<100',4]]],
['PEEP (cmH2O)',[['≤5',0],['6–8',1],['9–11',2],['12–14',3],['≥15',4]]],
['Static compliance (mL/cmH2O)',[['≥80',0],['60–79',1],['40–59',2],['20–39',3],['≤19',4]]]],
t=>{const s=t/4;return `LIS = ${s.toFixed(2)} (sum ÷ 4). ${s===0?'No lung injury':s<=2.5?'Mild–moderate lung injury':'Severe lung injury (ARDS); >3 used as ECMO referral criterion in CESAR'}.`});
N('pf','PaO2/FiO2 (P/F) & S/F ratio','Respiratory','Berlin ARDS Definition, JAMA 2012; Rice TW et al. Chest 2007 (S/F)','Oxygenation ratios',[['PaO2 (mmHg)','p'],['SpO2 (%) (optional for S/F)','s'],['FiO2 (%)','f']],v=>{const f=v.f/100,pf=v.p/f,sf=v.s/f;return `P/F = ${fx(pf,0)} mmHg${isFinite(pf)?(pf<=100?' (severe ARDS range if PEEP ≥5)':pf<=200?' (moderate ARDS range)':pf<=300?' (mild ARDS range)':' (>300)'):''}.`+(isFinite(sf)?` S/F = ${sf.toFixed(0)} (S/F 235 ≈ P/F 200; 315 ≈ P/F 300; valid when SpO2 ≤97%).`:'')});
N('rox','ROX index (HFNC)','Respiratory','Roca O et al. Am J Respir Crit Care Med 2019','Predicts HFNC success/failure',[['SpO2 (%)','s'],['FiO2 (%)','f'],['Respiratory rate (/min)','rr']],v=>{const r=(v.s/(v.f/100))/v.rr;return `ROX = ${fx(r,2)}. ≥4.88 at 2, 6 or 12 h → low risk of intubation. <2.85 (2 h), <3.47 (6 h), <3.85 (12 h) → high risk of HFNC failure.`});
N('pbw','Predicted body weight & tidal volume (ARDSNet)','Respiratory','ARDS Network. NEJM 2000','PBW-based lung-protective VT',[['Height (cm)','h'],['Sex','m',SEX]],v=>{const p=(v.m==1?50:45.5)+0.91*(v.h-152.4);return `PBW = ${fx(p)} kg. VT 4 mL/kg = ${fx(4*p,0)}, 6 mL/kg = ${fx(6*p,0)}, 8 mL/kg = ${fx(8*p,0)} mL.`},'Target VT 6 mL/kg PBW (range 4–8), Pplat ≤30 cmH2O.');
N('dp','Driving pressure','Respiratory','Amato MBP et al. NEJM 2015','ΔP = Pplat − PEEP',[['Plateau pressure (cmH2O)','pp'],['PEEP (cmH2O)','pe'],['Tidal volume (mL) (optional)','vt']],v=>{const d=v.pp-v.pe;return `ΔP = ${fx(d,0)} cmH2O ${d>15?'(>15: associated with higher mortality)':'(target ≤15)'}`+(isFinite(v.vt)?`; Cstat = ${(v.vt/d).toFixed(1)} mL/cmH2O.`:'.')});
N('mp','Mechanical power (simplified)','Respiratory','Gattinoni L et al. Intensive Care Med 2016 (simplified equation)','Energy delivered to the respiratory system per minute (volume control)',[['Respiratory rate (/min)','rr'],['Tidal volume (mL)','vt'],['Peak pressure (cmH2O)','pk'],['Plateau pressure (cmH2O)','pp'],['PEEP (cmH2O)','pe']],v=>{const m=0.098*v.rr*(v.vt/1000)*(v.pk-0.5*(v.pp-v.pe));return `MP ≈ ${fx(m,1)} J/min (>17 J/min associated with higher mortality, Serpa Neto 2018).`});
N('vent_rr','Ventilator: RR to reach target PaCO2','Respiratory','Standard alveolar ventilation relationship (PaCO2 ∝ 1/VA)','Estimate new respiratory rate',[['Current RR','rr'],['Current PaCO2','c'],['Target PaCO2','t']],v=>`New RR ≈ ${fx(v.rr*v.c/v.t,0)} /min (assumes constant VT and dead space).`);
N('vent_fio2','Ventilator: FiO2 for target PaO2','Respiratory','Standard approximation (PaO2/FiO2 constant)','Estimate FiO2 needed',[['Current PaO2 (mmHg)','p'],['Current FiO2 (%)','f'],['Target PaO2 (mmHg)','t']],v=>`FiO2 needed ≈ ${fx(Math.min(100,v.t*v.f/v.p),0)}% (rough; assumes stable P/F).`);
N('map','Mean arterial pressure (MAP)','Hemodynamics','Standard formula','MAP = DBP + (SBP − DBP)/3',[['Systolic BP','s'],['Diastolic BP','d']],v=>`MAP = ${fx((v.s+2*v.d)/3,0)} mmHg (target ≥65 in septic shock).`);
N('si','Shock index (SI, modified SI, age SI)','Hemodynamics','Allgöwer & Burri 1967; Liu YC 2012 (MSI); Zarzaur 2016 (age SI)','Occult shock screen',[['Heart rate','hr'],['Systolic BP','s'],['Diastolic BP (for MSI)','d'],['Age (for age SI)','a']],v=>{const si=v.hr/v.s,map=(v.s+2*v.d)/3;return `SI = ${fx(si,2)} (normal 0.5–0.7; ≥1.0 suggests significant shock).`+(isFinite(map)?` MSI (HR/MAP) = ${(v.hr/map).toFixed(2)} (>1.3 high risk).`:'')+(isFinite(v.a)?` Age SI = ${(si*v.a).toFixed(0)} (≥50 in age ≥55 predicts mortality).`:'')});
N('cao2','O2 content & delivery (CaO2, DO2, DO2I)','Hemodynamics','Standard physiology','Arterial O2 content and delivery',[['Hb (g/dL)','hb'],['SaO2 (%)','s'],['PaO2 (mmHg)','p'],['Cardiac output (L/min)','co'],['BSA (m²) (optional)','bsa']],v=>{const c=1.34*v.hb*v.s/100+0.003*v.p,d=c*v.co*10;return `CaO2 = ${fx(c,1)} mL/dL; DO2 = ${fx(d,0)} mL/min (normal ~1000)`+(isFinite(v.bsa)?`; DO2I = ${(d/v.bsa).toFixed(0)} mL/min/m² (normal 500–600).`:'.')});
N('fick','Cardiac output by Fick','Hemodynamics','Fick principle','CO = VO2 / (CaO2 − CvO2)',[['VO2 (mL/min) (est. 125 × BSA)','vo2'],['Hb (g/dL)','hb'],['SaO2 (%)','sa'],['SvO2 (%)','sv']],v=>{const d=1.34*v.hb*(v.sa-v.sv)/100*10;return `CO = ${fx(v.vo2/d,2)} L/min (a–v O2 difference ${fx(d/10,1)} mL/dL).`});
N('sv_svi','Stroke volume & SVI','Hemodynamics','Standard formula','SV = CO/HR',[['Cardiac output (L/min)','co'],['Heart rate','hr'],['BSA (m²)','bsa']],v=>{const s=v.co*1000/v.hr;return `SV = ${fx(s,0)} mL (60–100); SVI = ${fx(s/v.bsa,0)} mL/m² (33–47).`});
N('cpo','Cardiac power output (CPO)','Hemodynamics','Fincke R et al. JACC 2004 (SHOCK trial)','Prognosis in cardiogenic shock',[['MAP (mmHg)','m'],['Cardiac output (L/min)','co']],v=>{const c=v.m*v.co/451;return `CPO = ${fx(c,2)} W (<0.6 W: high mortality in cardiogenic shock).`});
N('papi','PAPi (pulmonary artery pulsatility index)','Hemodynamics','Korabathina R et al. Catheter Cardiovasc Interv 2012','RV dysfunction',[['PA systolic','s'],['PA diastolic','d'],['RA pressure (CVP)','ra']],v=>{const p=(v.s-v.d)/v.ra;return `PAPi = ${fx(p,2)} (<0.9 in inferior MI / <1.85 in advanced HF suggests RV failure).`});
N('vis','Vasoactive-Inotropic Score (VIS)','Hemodynamics','Gaies MG et al. Pediatr Crit Care Med 2010','Quantifies vasoactive support (doses in mcg/kg/min; vasopressin U/kg/min)',[['Dopamine','dop'],['Dobutamine','dob'],['Epinephrine','epi'],['Norepinephrine','ne'],['Milrinone','mil'],['Vasopressin (U/kg/min)','vp']],v=>{const z=x=>isFinite(x)?x:0;const s=z(v.dop)+z(v.dob)+100*z(v.epi)+100*z(v.ne)+10*z(v.mil)+10000*z(v.vp);return `VIS = ${s.toFixed(1)} (dop + dob + 100×epi + 100×NE + 10×milrinone + 10,000×vasopressin).`},'Blank fields treated as 0.');
N('nee','Norepinephrine equivalent (NEE)','Hemodynamics','Goradia S et al. J Crit Care 2021 (consensus conversion); Khanna (ATHOS-3)','Total vasopressor load as NE-equivalent (mcg/kg/min; vasopressin U/min)',[['Norepinephrine','ne'],['Epinephrine','epi'],['Phenylephrine','phe'],['Dopamine','dop'],['Vasopressin (U/min)','vp']],v=>{const z=x=>isFinite(x)?x:0;const s=z(v.ne)+z(v.epi)+z(v.phe)/10+z(v.dop)/100+z(v.vp)*2.5;return `NEE ≈ ${s.toFixed(3)} mcg/kg/min (NE + epi + phenylephrine/10 + dopamine/100 + vasopressin[U/min]×2.5).`},'Approximate; conversion factors vary in literature.');
