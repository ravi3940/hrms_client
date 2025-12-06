import React, { useState } from "react";
import { generateOfferLetter } from "../api/offerLetterApi";

export default function OfferLetterForm() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    salary: "",
    joiningDate: "",
    company: "",
  });

  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );

    if (logo) formData.append("logo", logo);
    if (signature) formData.append("signature", signature);

    const res = await generateOfferLetter(formData);

    // Download PDF
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "offer-letter.pdf";
    a.click();
  };

  return (
    <div>
      <h2>Create Offer Letter</h2>

      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
      <input placeholder="Position" onChange={(e)=>setForm({...form,position:e.target.value})} />
      <input placeholder="Salary" onChange={(e)=>setForm({...form,salary:e.target.value})} />
      <input placeholder="Joining Date" onChange={(e)=>setForm({...form,joiningDate:e.target.value})} />
      <input placeholder="Company" onChange={(e)=>setForm({...form,company:e.target.value})} />

      <p>Upload Logo</p>
      <input type="file" onChange={(e)=>setLogo(e.target.files[0])} />

      <p>Upload HR Signature</p>
      <input type="file" onChange={(e)=>setSignature(e.target.files[0])} />

      <button onClick={handleSubmit}>Generate PDF</button>
    </div>
  );
}
