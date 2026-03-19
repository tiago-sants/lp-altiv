import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-6">
      <h1 className="font-heading text-display text-accent font-light">404</h1>
      <p className="text-body-lg text-[var(--text-secondary)] mt-4 mb-8">
        Página não encontrada.
      </p>
      <Button href="/" variant="outlined">
        VOLTAR AO INÍCIO
      </Button>
    </div>
  );
}
