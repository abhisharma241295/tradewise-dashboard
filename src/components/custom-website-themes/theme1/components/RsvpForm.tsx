import { useState } from "react";

interface Props {
  data: any;
  bgColor: string;
  primaryColor: string;
  primaryFont: string;
  secondaryFont: string;
}

export default function RsvpForm({
  data,
  bgColor,
  primaryColor,
  primaryFont,
  secondaryFont,
}: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="w-full bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${data.bgImage})`,
      }}
    >
      <div className="bg-white p-8 w-full max-w-md rounded-sm shadow-lg">
        <h2 className="text-center mb-8 font-serif">
          <span
            className={data.title.className}
            style={{ color: primaryColor, fontFamily: primaryFont }}
          >
            {data.title.text}
          </span>
          <span
            className={data.subtitle.className}
            style={{ fontFamily: secondaryFont }}
          >
            {data.subtitle.text}
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {data.fields.map((field: any, index: number) => (
            <div key={index} className="space-y-1">
              <label
                className="text-sm text-gray-600"
                style={{ fontFamily: secondaryFont }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="w-full px-3 py-2 rounded-sm focus:outline-none"
                style={{
                  border: "1px solid #e5e7eb",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  fontFamily: secondaryFont,
                }}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className={data.submitButton.className}
            style={{ backgroundColor: primaryColor, fontFamily: primaryFont }}
          >
            {data.submitButton.text}
          </button>
        </form>
      </div>
    </div>
  );
}
