'use client';

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [responses, setResponses] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "surveyResponses"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setResponses(data);
    }
    fetchData();
  }, []);

  const generateInsights = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify(responses)
    });
    const data = await res.json();
    setAnalysis(data);
  };

  const avg = (key) =>
    responses.length
      ? (responses.reduce((a, b) => a + (b[key] || 0), 0) / responses.length).toFixed(1)
      : 0;

  return (
    <div style={{ padding: 40 }}>
      <h1>Executive Intelligence Report</h1>

      <div>
        <p>Respect Index: {avg("q1")}</p>
        <p>Leadership Trust: {avg("q2")}</p>
        <p>Fairness Index: {avg("q3")}</p>
      </div>

      <button onClick={generateInsights}>
        Generate AI Insights
      </button>

      {analysis && (
        <div>
          <h2>Executive Summary</h2>
          <p>{analysis.summary}</p>
        </div>
      )}
    </div>
  );
}
