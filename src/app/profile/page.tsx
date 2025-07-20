"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import InputField from "@/components/InputField";

interface FormData {
  "Full Name"?: string;
  Email?: string;
  "Mobile Number"?: string;
  Password?: string;
  "Re-Enter Password"?: string;
}

interface FormField {
  name: string;
  placeholder: string;
  value: string;
}

const UserDetails: React.FC = () => {
  const [form, setForm] = useState<FormData>({});
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsInvalid(false);
  };

  const isFormValid = (): boolean => {
    return true;
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // api call
  };

  const formFields: FormField[] = [
    {
      name: "Full Name",
      placeholder: "Enter Full Name",
      value: "Lakshman Bharath",
    },
    {
      name: "Email",
      placeholder: "Enter the EmailId",
      value: "Email Id",
    },
    {
      name: "Mobile Number",
      placeholder: "Enter the Mobile Number",
      value: "1234567884",
    },
    {
      name: "Password",
      placeholder: "Enter the Password",
      value: "fjsdfk",
    },
  ];

  return (
    <form
      className=" w-[310px] md:w-[400px] p-4 md:px-[40px] rounded flex-shrink-0 shadow ring-[0.1px]"
      onSubmit={handleFormSubmit}
    >
      <p className="text-center font-semibold mb-2 text-2xl">UserDetails</p>
      <div className="gap-[2px] flex flex-col">
        {formFields.map((item: FormField, idx: number) => {
          const { name } = item;
          return (
            <InputField
              key={name + idx}
              onChange={handleInputChange}
              readOnly={true}
              {...item}
            />
          );
        })}
      </div>
      <p
        className={`text-red-600 ${
          isInvalid ? "visible" : "invisible"
        } font-semibold text-center`}
      >
        Invalid Login Credentials
      </p>
      <button
        type="submit"
        className="border mt-4 flex mx-auto rounded-sm px-3 font-semibold py-1 shadow"
      >
        Edit
      </button>
    </form>
  );
};

export default UserDetails;
