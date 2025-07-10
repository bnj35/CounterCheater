import { Button} from "@heroui/react";
import { Card, CardBody, CardHeader } from "@heroui/react";
// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Counter Cheater
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Report and track Counter-Strike cheaters to keep the game fair
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-800/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold text-blue-400">Report Cheaters</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-300">
                Submit evidence of cheating behavior with video proof and detailed descriptions.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold text-purple-400">Track Status</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-300">
                Monitor the status of reported cheaters and see community contributions.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold text-green-400">Community</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-300">
                Join the fight against cheaters and help maintain fair gameplay.
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            color="primary" 
            className="mr-4"
          >
            Report a Cheater
          </Button>
          <Button 
            size="lg" 
            variant="bordered" 
            color="secondary"
          >
            View Reports
          </Button>
        </div>
      </main>
    </div>
  );
}