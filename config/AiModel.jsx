// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';
  
  async function main() {
    const ai = new GoogleGenAI({
      apiKey: process.env.EXPO_PUBLIC_API_KEY,
    });
    const tools = [
      {
        googleSearch: {
        }
      },
    ];
    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      tools,
      responseMimeType: 'application/json',
    };
    const model = 'gemini-2.5-pro';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: ` IDEA: dedent\`:As your are coaching teacher
      - User want to learn about the topic
      - Generate 5-7 Course title for study (Short)
      - Make sure it is releated to description
      - Output will be ARRAY of String in JSON FORMAT only
      - Do not add any plain text in output,
      \`,`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `**Developing Course Titles**
  
  I'm currently focused on generating course titles about "dedent" for the user. I aim to create 5-7 concise and relevant options formatted as a JSON array of strings. This task is progressing smoothly, and I'm mindful of the requested output format.
  
  
  **Generating Course Titles**
  
  I've analyzed the user's request and brainstormed several course title options around "dedent," primarily focusing on Python implementations as the term is most relevant there. My thought process moved quickly to generate and evaluate a diverse list of titles, from introductory topics like code formatting to more advanced concepts such as text processing. Now, I'm carefully selecting the 5-7 most suitable titles for the user's needs.
  
  
  **Formulating Final Titles**
  
  I've refined the title list based on the preliminary brainstorming. I've narrowed down the options, ensuring they're concise, relevant to Python and "dedent," and address various skill levels.  I've paid close attention to brevity and clarity to meet the user's criteria precisely. The final JSON array of strings is almost ready. Now, I will re-examine for clarity and context.
  
  
  `,
          },
          {
            text: `\`\`\`json
  [
    "Mastering Code Indentation and Dedenting",
    "Python's Dedent for Cleaner Code",
    "Code Formatting: The Art of Dedent",
    "Structuring Code: Indent and Dedent Principles",
    "Readability Rules: Mastering Dedent",
    "From Indent to Dedent: A Coder's Guide",
    "Advanced Text Processing with Dedent"
  ]
  \`\`\``,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `INSERT_INPUT_HERE`,
          },
        ],
      },
    ];
  
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    let fileIndex = 0;
    for await (const chunk of response) {
    }
  }
  
  main();
  