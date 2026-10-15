// Scripted answers for "Readers ask the Record".
// Each answer is a list of parts; a part with `cite` gets a footnote to that source.
// `keywords` (English and German) let the free-text box match a typed question.
// Anything that matches nothing is declined, which is the point.

import type { Localized } from '../i18n';

export interface AnswerPart {
  text: Localized;
  cite?: string;
}

export interface Question {
  id: string;
  question: Localized;
  keywords: string[];
  answer: AnswerPart[];
  declined?: boolean;
}

export const questions: Question[] = [
  {
    id: 'document-ai',
    question: {
      en: 'What has he built with document AI?',
      de: 'Was hat er mit Dokumenten-KI gebaut?',
    },
    keywords: [
      'document', 'documents', 'legal', 'law', 'contract', 'contracts', 'optimaite', 'clausecraft', 'rag', 'agent', 'agents', 'built',
      'dokument', 'dokumente', 'dokumenten-ki', 'kanzlei', 'kanzleien', 'recht', 'vertrag', 'verträge', 'agenten', 'gebaut',
    ],
    answer: [
      {
        text: {
          en: 'As Founding Engineer at Optimaite he co-architected a data-sovereign AI platform for law firms,',
          de: 'Als Founding Engineer bei Optimaite hat er eine datensouveräne KI-Plattform für Kanzleien mitkonzipiert',
        },
        cite: 'optimaite',
      },
      {
        text: {
          en: ' building its RAG pipelines and tool-using agents with tracing and audit logging.',
          de: ' und ihre RAG-Pipelines und werkzeugnutzenden Agenten mit Tracing und Audit-Logging gebaut.',
        },
        cite: 'optimaite-rag',
      },
      {
        text: {
          en: ' Before that he built ClauseCraft, which drafts contracts and rates every clause for risk.',
          de: ' Davor entstand ClauseCraft, das Verträge entwirft und jede Klausel nach Risiko bewertet.',
        },
        cite: 'clausecraft',
      },
    ],
  },
  {
    id: 'frontend',
    question: {
      en: 'Has he led frontend work in production?',
      de: 'Hat er Frontend-Arbeit in Produktion geleitet?',
    },
    keywords: [
      'frontend', 'front-end', 'react', 'vue', 'angular', 'lead', 'led', 'migration', 'ui',
      'geleitet', 'leitung', 'oberfläche',
    ],
    answer: [
      {
        text: {
          en: 'Yes. He led the BOND migration from AngularJS to React, cutting load times by 25%,',
          de: 'Ja. Er hat die Migration von BOND von AngularJS auf React geleitet und die Ladezeiten um 25 % gesenkt,',
        },
        cite: 'bond',
      },
      {
        text: {
          en: ' and the LineSheets Studio UI revamp, which raised engagement by 35%.',
          de: ' außerdem die UI-Überarbeitung von LineSheets Studio, die das Engagement um 35 % steigerte.',
        },
        cite: 'linesheets',
      },
    ],
  },
  {
    id: 'thesis',
    question: {
      en: 'What is his thesis about?',
      de: 'Worum geht es in seiner Masterarbeit?',
    },
    keywords: [
      'thesis', 'health', 'medical', 'patient', 'patients', 'fraunhofer', 'master', 'research', 'hospital', 'fhir',
      'masterarbeit', 'abschlussarbeit', 'gesundheit', 'medizin', 'krankenhaus', 'forschung', 'patienten',
    ],
    answer: [
      {
        text: {
          en: 'A modular, FHIR-based hospital system with privacy-preserving design for German healthcare, where persona-specific AI agents are benchmarked on local vs. cloud LLMs.',
          de: 'Ein modulares, FHIR-basiertes Krankenhaussystem mit datenschutzfreundlichem Design für das deutsche Gesundheitswesen, in dem rollenspezifische KI-Agenten auf lokalen und Cloud-LLMs verglichen werden.',
        },
        cite: 'thesis',
      },
      {
        text: {
          en: ' The rule: the AI never says anything the record can’t support.',
          de: ' Die Regel: Die KI sagt nichts, was die Akte nicht belegt.',
        },
        cite: 'thesis-post',
      },
    ],
  },
  {
    id: 'rust',
    question: {
      en: 'Does he have production Rust experience?',
      de: 'Hat er Produktionserfahrung mit Rust?',
    },
    keywords: ['rust'],
    declined: true,
    answer: [
      {
        text: {
          en: 'The record does not support that. The closest evidence is Python, TypeScript, JavaScript and Java.',
          de: 'Dafür gibt es keinen Beleg. Am nächsten kommen Python, TypeScript, JavaScript und Java.',
        },
        cite: 'skills',
      },
    ],
  },
];

export function matchQuestion(input: string): Question | undefined {
  const words = new Set(input.toLowerCase().match(/[\p{L}0-9+#-]+/gu) ?? []);
  let best: Question | undefined;
  let bestScore = 0;
  for (const q of questions) {
    const score = q.keywords.filter((k) => words.has(k)).length;
    if (score > bestScore) {
      best = q;
      bestScore = score;
    }
  }
  return best;
}
