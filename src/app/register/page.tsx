"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import InputField from "@/components/InputField";
import axios from "axios";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  "re-enter password"?: string;
  address?: string;
}

interface FormField {
  name: string;
  placeholder: string;
  errorMessage?: string;
  type?: string;
}

interface FormErrors {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  password?: boolean;
  "re-enter password"?: boolean;
  address?: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<FormData>({});
  const [formerror, setFormError] = useState<FormErrors>({});
  const { showErrorToast, showSuccessToast } = useToast();
  const { push } = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: false }));
  };

  const isFormValid = (): boolean => {
    const {
      email = "",
      phone = "",
      password = "",
      "re-enter password": reEnterPassword,
    } = form;
    const errors: FormErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = true;
    if (!/^\d{10}$/.test(phone)) errors.phone = true;
    if (password.length < 6) errors.password = true;
    if (password !== reEnterPassword) errors["re-enter password"] = true;

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }

    try {
      await axios.post("http://localhost:8000/user/", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      showSuccessToast({ message: "User registered successfully" });
      push("/");
    } catch (err) {
      showErrorToast({ message: "Token has expired, please re-login" });
      push("/");
    }
  };

  const formFields: FormField[] = [
    {
      name: "name",
      placeholder: "Enter Full Name",
    },
    {
      name: "email",
      placeholder: "Enter the EmailId",
      errorMessage: "Invalid Email Format",
    },
    {
      name: "phone",
      placeholder: "Enter the Mobile Number",
      errorMessage: "Invalid Phone Number",
    },
    {
      name: "address",
      placeholder: "Enter Address",
    },
    {
      name: "password",
      placeholder: "Enter the Password",
      errorMessage: "Password must be at least 6 characters",
      type: "password",
    },
    {
      name: "re-enter password",
      placeholder: "Re-Enter the Password",
      errorMessage: "Passwords do not match",
      type: "password",
    },
  ];

  return (
    <form
      className=" w-[310px] md:w-[400px] p-4 md:px-[40px] rounded flex-shrink-0 shadow ring-[0.1px]"
      onSubmit={handleFormSubmit}
    >
      <p className="text-center font-semibold mb-2 text-2xl">Register</p>
      <div className="gap-[2px] flex flex-col">
        {formFields.map((item: FormField, idx: number) => {
          const { name } = item;
          return (
            <InputField
              key={name + idx}
              onChange={handleInputChange}
              value={form[name as keyof FormData] || ""}
              error={formerror[name as keyof FormErrors]}
              {...item}
            />
          );
        })}
      </div>

      <button
        type="submit"
        className="border mt-4 flex mx-auto rounded-sm px-3 font-semibold py-1 shadow"
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
