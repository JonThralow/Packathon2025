'use client';

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SurveyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    role: "",
    q1: 5,
    q2: 5,
    q3: 5,
    challenge: "",
    opportunity: "",
    stress: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "surveyResponses"), {
      ...form,
      createdAt: serverTimestamp()
    });

    router.push("/dashboard");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Organizational Intelligence Survey</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>

        <select
          onChange={(e) => setForm({...form, role: e.target.value})}
        >
          <option value="">Select Role Level</option>
          <option>Executive</option>
          <option>Senior Manager</option>
          <option>Manager</option>
          <option>Supervisor</option>
          <option>Frontline</option>
        </select>

        <p>1. I am treated with respect (1-10)</p>
        <input type="range" min="1" max="10"
          onChange={(e)=>setForm({...form,q1:Number(e.target.value)})} />

        <p>2. Leadership understands operations (1-10)</p>
        <input type="range" min="1" max="10"
          onChange={(e)=>setForm({...form,q2:Number(e.target.value)})} />

        <p>3. Promotions are based on performance (1-10)</p>
        <input type="range" min="1" max="10"
          onChange={(e)=>setForm({...form,q3:Number(e.target.value)})} />

        <textarea
          placeholder="Where do you think is the biggest challenge with our company?"
          onChange={(e)=>setForm({...form,challenge:e.target.value})}
        />

        <textarea
          placeholder="What is the biggest opportunity for our company?"
          onChange={(e)=>setForm({...form,opportunity:e.target.value})}
        />

        <textarea
          placeholder="What creates the most stress for employees?"
          onChange={(e)=>setForm({...form,stress:e.target.value})}
        />

        <br/><br/>
        <button type="submit">Submit</button>

      </form>
    </div>
  );
}
