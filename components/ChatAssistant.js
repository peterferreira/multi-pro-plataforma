"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatAssistant.module.css";
import ReactMarkdown from "react-markdown";
import { siteConfig } from "../config/site";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: `Olá! Sou a assistente virtual do(a) ${siteConfig.professional.name}. Como posso ajudar você hoje?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Formulário de Contato
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    
    // Ocultar form se estiver aberto e o user continuar conversando
    setShowForm(false); 

    const newMessages = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: messages,
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: "Desculpe, ocorreu um erro. Tente novamente mais tarde." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Desculpe, ocorreu um erro na conexão." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, phone, message } = formData;
    if (!name || !phone || !message) return;

    const whatsappNumber = siteConfig.professional.whatsapp;
    const text = `Olá, ${siteConfig.professional.name}. Meu nome é *${name}*.\nMeu telefone é: ${phone}.\n\nGostaria de saber sobre:\n"${message}"`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(url, "_blank");
    setShowForm(false);
    setFormData({ name: "", phone: "", message: "" });
    setMessages((prev) => [
      ...prev,
      { role: "model", text: `Ótimo! Você será redirecionado para o WhatsApp do(a) ${siteConfig.professional.name}.` }
    ]);
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <h3>Assistente Virtual</h3>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.role === "user" ? styles.userMessage : styles.botMessage
                }`}
              >
                {msg.role === "model" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isLoading && <div className={styles.loading}>Digitando...</div>}
            <div ref={messagesEndRef} />
          </div>

          {!showForm && messages.length > 2 && (
             <div className={styles.humanButtonContainer}>
               <button className={styles.humanButton} onClick={() => setShowForm(true)}>
                 Falar com Humano no WhatsApp
               </button>
             </div>
          )}

          {showForm ? (
            <form className={styles.formContainer} onSubmit={handleFormSubmit}>
              <h4>Contato Direto</h4>
              <p>Preencha para enviar um WhatsApp para a equipe.</p>
              <input
                type="text"
                placeholder="Seu Nome"
                className={styles.formInput}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Seu Telefone (WhatsApp)"
                className={styles.formInput}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <textarea
                placeholder="Como posso ajudar?"
                className={`${styles.formInput} ${styles.formTextarea}`}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <button type="submit" className={styles.formSubmit}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Enviar para WhatsApp
            </button>
            <button type="button" className={styles.formCancel} onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </form>
        ) : (
          <form className={styles.inputArea} onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className={styles.input}
              disabled={isLoading}
            />
            <button type="submit" className={styles.sendButton} disabled={isLoading || !input.trim()}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m-7 7l7-7 7 7" />
              </svg>
            </button>
          </form>
        )}
      </div>
    )}

    {!isOpen && (
      <button className={styles.chatButton} onClick={() => setIsOpen(true)}>
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    )}
  </div>
  );
}
