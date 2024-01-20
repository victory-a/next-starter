import React from 'react';
import jsPDF from 'jspdf';

export default function Index() {
  const [formValues, setformValues] = React.useState({
    name: '',
    email: '',
  });

  const [pdfContent, setPdfContent] = React.useState('');

  function handleChange(e: any) {
    setformValues(curr => ({ ...curr, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const pdf = new jsPDF();

    Object.entries(formValues).forEach(([key, value], index) => {
      pdf.text(`${key}: ${value}`, 10, 10 + index * 5);
    });

    const pdfContent = pdf.output('datauristring');
    setPdfContent(pdfContent);
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-3 text-center text-[18px]">Next of kin Cashout 🤑</h1>

      <form onSubmit={handleSubmit} className="flex w-full max-w-[500px] flex-col">
        <div className="form-container flex flex-col">
          <fieldset className="mb-4 flex flex-col">
            <label htmlFor="name" className="mb-1 text-[14px]">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="rounded-sm p-5 text-[14px] text-black"
              onChange={handleChange}
              value={formValues.name}
            />
          </fieldset>

          <fieldset className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-[14px]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-sm p-5 text-[14px] text-black"
              onChange={handleChange}
              value={formValues.email}
            />
          </fieldset>

          <button className="my-10 rounded-md border p-4 ">Submit</button>

          {pdfContent && (
            <div>
              <a href={pdfContent} download={`${formValues.name}.pdf}`}>
                Download PDF
              </a>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
