"use client";

import { useState, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { fadeInLeft, fadeInRight } from "@/components/animations/gsap-utils";
import { CREDIT_OPTIONS, WHATSAPP_LINKS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FormStatus = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  whatsapp?: string;
  creditType?: string;
  lgpdConsent?: string;
}

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCurrency(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10);
  return `R$ ${num.toLocaleString("pt-BR")}`;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [creditType, setCreditType] = useState("");
  const [amount, setAmount] = useState("");
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState("");

  const containerRef = useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    fadeInLeft(".contact-form", container, { duration: 0.8 });
    fadeInRight(".contact-cta", container, { duration: 0.8 });
  });

  function validate(): FieldErrors {
    const fieldErrors: FieldErrors = {};
    if (!name || name.trim().length < 3)
      fieldErrors.name = "Nome deve ter pelo menos 3 caracteres.";
    if (!whatsapp || whatsapp.replace(/\D/g, "").length < 10)
      fieldErrors.whatsapp = "Informe um WhatsApp valido.";
    if (!creditType)
      fieldErrors.creditType = "Selecione o tipo de credito.";
    if (!lgpdConsent)
      fieldErrors.lgpdConsent =
        "E necessario concordar com a Politica de Privacidade.";
    return fieldErrors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setGeneralError("");

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.replace(/\D/g, ""),
          creditType,
          amount: amount.replace(/\D/g, ""),
          lgpdConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGeneralError(data.error || "Erro ao enviar. Tente novamente.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setGeneralError("Erro de conexao. Verifique sua internet e tente novamente.");
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-lg bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-body-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-accent focus:outline-none transition-colors duration-200";

  return (
    <section
      ref={containerRef}
      id="contato"
      className="py-24 md:py-32 bg-[var(--bg-surface)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Form */}
          <div className="contact-form">
            <span className="text-label text-accent uppercase tracking-[3px] font-body font-semibold">
              Contato
            </span>
            <h2 className="font-heading text-h2 text-[var(--text-primary)] mt-2 mb-4 font-light">
              Vamos comecar?
            </h2>
            <p className="text-body-base text-[var(--text-secondary)] mb-8">
              Preencha o formulario e um especialista entrara em contato em ate 24h.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                {/* Checkmark icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-h3 text-[var(--text-primary)]">
                  Mensagem enviada!
                </h3>
                <p className="text-body-base text-[var(--text-secondary)] max-w-sm">
                  Recebemos seu contato! Em breve um especialista ira te
                  atender.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-small text-[var(--text-secondary)] mb-1.5 font-body"
                  >
                    Nome completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className={inputClasses}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label
                    htmlFor="contact-whatsapp"
                    className="block text-small text-[var(--text-secondary)] mb-1.5 font-body"
                  >
                    WhatsApp *
                  </label>
                  <input
                    id="contact-whatsapp"
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                    placeholder="(00) 00000-0000"
                    className={inputClasses}
                  />
                  {errors.whatsapp && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                {/* Credit type */}
                <div>
                  <label
                    htmlFor="contact-credit"
                    className="block text-small text-[var(--text-secondary)] mb-1.5 font-body"
                  >
                    Tipo de credito *
                  </label>
                  <select
                    id="contact-credit"
                    required
                    value={creditType}
                    onChange={(e) => setCreditType(e.target.value)}
                    className={`${inputClasses} ${!creditType ? "text-[var(--text-muted)]" : ""}`}
                  >
                    <option value="" disabled>
                      Selecione uma opcao
                    </option>
                    {CREDIT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.creditType && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.creditType}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <label
                    htmlFor="contact-amount"
                    className="block text-small text-[var(--text-secondary)] mb-1.5 font-body"
                  >
                    Valor desejado
                  </label>
                  <input
                    id="contact-amount"
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(formatCurrency(e.target.value))}
                    placeholder="R$ 0"
                    className={inputClasses}
                  />
                </div>

                {/* LGPD */}
                <div className="flex items-start gap-3">
                  <input
                    id="contact-lgpd"
                    type="checkbox"
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-[var(--border)] accent-[var(--accent)]"
                  />
                  <label
                    htmlFor="contact-lgpd"
                    className="text-small text-[var(--text-secondary)] font-body cursor-pointer"
                  >
                    Concordo com a Politica de Privacidade e autorizo o contato.
                  </label>
                </div>
                {errors.lgpdConsent && (
                  <p className="text-xs text-red-500">{errors.lgpdConsent}</p>
                )}

                {/* General error */}
                {generalError && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-small text-red-500">
                    {generalError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-gradient-to-br from-accent to-accent-dark px-8 py-4 font-body text-label font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="opacity-75"
                        />
                      </svg>
                      ENVIANDO...
                    </>
                  ) : (
                    "SOLICITAR CONTATO"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right — WhatsApp CTA */}
          <div className="contact-cta flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <h3 className="font-heading text-h3 text-[var(--text-primary)] mb-4 font-light">
              Prefere falar agora?
            </h3>
            <p className="text-body-base text-[var(--text-secondary)] mb-8 max-w-sm">
              Converse diretamente com um de nossos especialistas pelo WhatsApp.
            </p>

            <a
              href={WHATSAPP_LINKS.contact}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar pelo WhatsApp com um especialista"
              className="inline-flex items-center justify-center gap-3 rounded-pill bg-whatsapp px-8 py-4 font-body text-label font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:brightness-110"
            >
              {/* WhatsApp icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              FALAR PELO WHATSAPP
            </a>

            <p className="mt-6 text-small text-[var(--text-tertiary)]">
              Atendimento em horario comercial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
