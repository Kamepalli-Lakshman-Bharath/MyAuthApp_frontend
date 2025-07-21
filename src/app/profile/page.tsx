"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import InputField from "@/components/InputField";
import { useRouter } from "next/navigation";
import axios from "axios";
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
}
interface FormErrors {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  password?: boolean;
  "re-enter password"?: boolean;
  address?: string;
}

const UserDetails: React.FC = () => {
  const [form, setForm] = useState<FormData>({});
  const [formerror, setFormError] = useState<FormErrors>({});
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const [actuallForm, setActualForm] = useState<FormData>({});
  const { back, push } = useRouter();
  const { showErrorToast, showSuccessToast } = useToast();

  const isFormValid = (): boolean => {
    const { email = "", phone = "", password = "" } = form;
    const errors: FormErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = true;
    if (!/^\d{10}$/.test(phone)) errors.phone = true;
    if (password.length < 6) errors.password = true;
    if (password !== form["re-enter password"])
      errors["re-enter password"] = true;

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        showErrorToast({ message: "Token has expired please login again" });
        push("/");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/user/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setForm({
          ...response.data,
          "re-enter password": response.data.password,
        });
        setActualForm({
          ...response.data,
          "re-enter password": response.data.password,
        });
      } catch (err) {
        showErrorToast({ message: "Token has expired please login again" });
        console.error("Fetch user failed:", err);
        back();
      }
    };
    fetchUser();
  }, []);

  const handleAllowEdit = () => {
    setAllowEdit((prev) => {
      if (prev) {
        setForm(actuallForm);
      }
      return !prev;
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      back();
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/user/${userId}`,
        form,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setForm(response.data.data);
      setActualForm({
        ...response.data.data,
        "re-enter password": response.data.data.password,
      });
      setAllowEdit(false);
    } catch (err) {
      showErrorToast({ message: "Token has expired please re-login" });
      push("/");
      return;
    }
    showSuccessToast({ message: "User details updated successfully" });
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
              value={form[name as keyof FormData] || ""}
              readOnly={!allowEdit}
              error={formerror[name as keyof FormErrors]}
              {...item}
            />
          );
        })}

        {allowEdit ? (
          <InputField
            name="re-enter password"
            placeholder="Re-Enter the Password"
            errorMessage="Passwords do not match"
            error={formerror["re-enter password"]}
            value={form["re-enter password"]}
            onChange={handleInputChange}
          />
        ) : null}
      </div>
      <div className="flex gap-2 items-center">
        {allowEdit && (
          <button
            type="submit"
            className="border mt-4 flex mx-auto rounded-sm px-3 font-semibold py-1 shadow"
          >
            Update
          </button>
        )}
        <button
          type="button"
          onClick={handleAllowEdit}
          className="border mt-4 flex mx-auto rounded-sm px-3 font-semibold py-1 shadow"
        >
          {allowEdit ? "Cancel" : "Edit"}
        </button>
      </div>
    </form>
  );
};

export default UserDetails;
