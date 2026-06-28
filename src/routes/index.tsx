import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/ellie/Header";
import { Footer } from "../components/ellie/Footer";
import { Summarizer } from "../components/ellie/Summarizer";
import { AmbientBackground } from "../components/ellie/AmbientBackground";
import { LiveData } from "../components/ellie/LiveData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eLLiE | Agentic Intelligence" },
      {
        name: "description",
        content:
          "eLLiE turns any Solana transaction signature into a clear, plain-English summary using agentic intelligence.",
      },
      { property: "og:title", content: "eLLiE | Agentic Intelligence" },
      {
        property: "og:description",
        content:
          "Paste a Solana transaction signature and get an instant, plain-English summary.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#050505",
        isolation: "isolate",
      }}
    >
      <AmbientBackground />
      <LiveData />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <Header />
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Summarizer />
        </main>
        <Footer />
      </div>
    </div>
  );
}
