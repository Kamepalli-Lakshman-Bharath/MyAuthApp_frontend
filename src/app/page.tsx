"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import InputField from "@/components/InputField";
import axios from "axios";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

interface FormFields {
  Email?: string;
  Password?: string;
}

interface FieldConfig {
  name: keyof FormFields;
  placeholder: string;
}

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<FormFields>({});
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsInvalid(false);
  };
  const { showErrorToast, showSuccessToast } = useToast();
  const { push } = useRouter();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { Email, Password } = form;

    if (!Email || !Password) {
      setIsInvalid(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email: Email,
        password: Password,
      });

      const { access_token, token_type, id } = response.data;
      if (access_token && id) {
        localStorage.setItem("token", token_type + " " + access_token);
        localStorage.setItem("userId", id);
        showSuccessToast({ message: "Login successful" });
        push(`/profile`);
      } else {
        showErrorToast({ message: "Token not received" });
        console.error("Token not received");
      }
    } catch (err) {
      showErrorToast({ message: "Invalid login credentials" });
      setIsInvalid(true);
      console.error("Login error:", err);
    }
  };

  const formFields: FieldConfig[] = [
    {
      name: "Email",
      placeholder: "Enter the EmailId",
    },
    {
      name: "Password",
      placeholder: "Enter the Password",
    },
  ];

  return (
    <form
      className="w-[310px] md:w-[400px] p-4 md:px-[40px] rounded flex-shrink-0 shadow ring-[#FF8541] ring-[0.1px]"
      onSubmit={handleFormSubmit}
    >
      <p className="text-center font-semibold mb-2 text-2xl">Login</p>
      <div className="gap-[2px] flex flex-col">
        {formFields.map((item, idx) => {
          const { name } = item;
          return (
            <InputField
              key={name + idx}
              onChange={handleInputChange}
              value={form[name] || ""}
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
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
