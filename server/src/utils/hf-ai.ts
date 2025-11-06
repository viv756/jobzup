// import { config } from "../config/app.config";

// async function getSentenceSimilarity(text1: string, text2: string): Promise<number> {
//   console.log("🟢 Getting sentence similarity...");

//   try {
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
//       {
//         headers: {
//           Authorization: `Bearer ${config.HF_API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({
//           inputs: {
//             source_sentence: text1,
//             sentences: [text2]  // Array of sentences to compare against
//           }
//         }),
//       }
//     );

//     console.log("🟡 Response status:", response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log("🟣 Similarity score:", data);
//     return data[0]; // Returns similarity score between 0-1
//   } catch (error) {
//     console.error("🔴 Error calling Hugging Face API:", error);
//     throw error;
//   }
// }
// export async function main() {
//   try {
//     const result = await getSentenceSimilarity("Helloworld","hello");

//   } catch (error) {
//     console.error("❌ Error in main:", error);
//   }
// }

import { config } from "../config/app.config";

// THIS WORKS - Use the similarity approach that doesn't timeout
async function getSimilarityScore(text1: string, text2: string): Promise<number> {
  console.log("🟢 Getting similarity score...");

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2",
      {
        headers: {
          Authorization: `Bearer ${config.HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: {
            source_sentence: text1,
            sentences: [text2],
          },
        }),
      }
    );

    console.log("🟡 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
    }

    const data = await response.json();
    console.log("🟣 Similarity score received:", data);
    return data[0]; // Returns the similarity score between 0-1
  } catch (error) {
    console.error("🔴 Error getting similarity score:", error);
    throw error;
  }
}

// Main job matching function - USING WHAT WORKS
export async function getJobMatchScore(
  candidateProfile: string,
  jobDescription: string
): Promise<number> {
  try {
    console.log("🎯 Calculating job match score...");

    const similarity = await getSimilarityScore(candidateProfile, jobDescription);
    const score = Math.round(similarity * 100);

    console.log("✅ Match score calculated:", score + "%");
    return score;
  } catch (error) {
    console.error("🔴 Error calculating job match score:", error);
    throw error;
  }
}

// Enhanced job matching with skill analysis
export async function analyzeJobMatch(
  candidateSkills: string[],
  jobDescription: string
): Promise<{
  overallScore: number;
  skillMatches: { skill: string; score: number }[];
  missingSkills: string[];
}> {
  try {
    console.log("🔍 Analyzing job match with skills...");

    // Calculate match for each individual skill
    const skillMatches = await Promise.all(
      candidateSkills.map(async (skill) => {
        const similarity = await getSimilarityScore(skill, jobDescription);
        return {
          skill,
          score: Math.round(similarity * 100),
        };
      })
    );

    // Calculate overall score
    const overallScore = Math.round(
      skillMatches.reduce((sum, match) => sum + match.score, 0) / skillMatches.length
    );

    // Identify strong matches and missing skills
    const strongMatches = skillMatches.filter((match) => match.score > 70);
    const weakMatches = skillMatches.filter((match) => match.score <= 30);

    console.log("✅ Analysis completed");

    return {
      overallScore,
      skillMatches,
      missingSkills: weakMatches.map((match) => match.skill),
    };
  } catch (error) {
    console.error("🔴 Error analyzing job match:", error);
    throw error;
  }
}

// Compare candidate with multiple jobs
export async function findBestJobMatches(
  candidateProfile: string,
  jobs: Array<{ id: string; title: string; description: string }>
): Promise<Array<{ id: string; title: string; score: number }>> {
  try {
    console.log(`🔍 Finding best matches among ${jobs.length} jobs...`);

    const jobMatches = await Promise.all(
      jobs.map(async (job) => {
        const score = await getJobMatchScore(candidateProfile, job.description);
        return {
          id: job.id,
          title: job.title,
          score,
        };
      })
    );

    // Sort by best matches first
    return jobMatches.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error("🔴 Error finding job matches:", error);
    throw error;
  }
}

// Test the complete system
export async function main() {
  try {
    console.log("🧪 Testing job matching system...");

    // Test data
    const candidateProfile =
      "Experienced JavaScript developer with React, Node.js, and MongoDB skills. Strong background in building web applications and REST APIs.";
    const jobDescription =
      "Looking for a Full Stack Developer with expertise in JavaScript, React, Node.js, and database systems. Experience with cloud platforms and modern web development practices required.";
    const candidateSkills = [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "HTML",
      "CSS",
    ];

    // Test 1: Basic job matching
    console.log("\n📊 Test 1: Basic Job Matching");
    const matchScore = await getJobMatchScore(candidateProfile, jobDescription);
    console.log("Match Score:", matchScore + "%");

    // Test 2: Skill-based analysis
    console.log("\n📊 Test 2: Skill-based Analysis");
    const analysisResult = await analyzeJobMatch(candidateSkills, jobDescription);
    console.log("Overall Score:", analysisResult.overallScore + "%");
    console.log("Skill Matches:", analysisResult.skillMatches);
    console.log("Areas to improve:", analysisResult.missingSkills);

    // Test 3: Multiple job matching
    console.log("\n📊 Test 3: Multiple Job Matching");
    const jobs = [
      {
        id: "1",
        title: "Frontend React Developer",
        description: "Need React developer with JavaScript and modern frontend skills",
      },
      {
        id: "2",
        title: "Full Stack Developer",
        description:
          "Looking for full stack developer with Node.js, React, and database experience",
      },
      {
        id: "3",
        title: "Python Backend Developer",
        description: "Backend developer with Python and Django experience required",
      },
    ];

    const bestMatches = await findBestJobMatches(candidateProfile, jobs);
    console.log("Best job matches:");
    bestMatches.forEach((match) => {
      console.log(`- ${match.title}: ${match.score}%`);
    });
  } catch (error) {
    console.error("❌ Error in main:", error);
  }
}
