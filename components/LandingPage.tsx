import { Button } from "@/components/ui/button"
import { ArrowRight, Music, ThumbsUp, ThumbsDown, Play } from 'lucide-react'
import Link from "next/link"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Let Your Fans <span className="text-purple-400">Choose the Beat</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create interactive music streams for your fans. Let them choose the next track and vote on their favorites.
          </p>
          <Button className="bg-purple-500 hover:bg-purple-600 text-lg px-8 py-4">
            Start Streaming <ArrowRight className="ml-2" />
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16 container">
          <FeatureCard 
            icon={<Music className="w-12 h-12 text-purple-400" />}
            title="Create Your Stream"
            description="Set up your music stream in minutes and share it with your audience."
          />
          <FeatureCard 
            icon={<Play className="w-12 h-12 text-purple-400" />}
            title="Fan-Driven Playlists"
            description="Let your fans add songs to the queue and vote on what plays next."
          />
          <FeatureCard 
            icon={<ThumbsUp className="w-12 h-12 text-purple-400" />}
            title="Interactive Voting"
            description="Fans can upvote or downvote songs to influence the playlist order."
          />
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Your Music Streams?</h2>
          <Button className="bg-purple-500 hover:bg-purple-600 text-lg px-8 py-4">
            Get Started Now
          </Button>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-gray-400">
        © 2024 YTMusicStream. All rights reserved.
      </footer>
    </div>
  )
}

