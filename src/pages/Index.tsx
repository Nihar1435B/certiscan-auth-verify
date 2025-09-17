import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Clock, CheckCircle, Building, GraduationCap, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Verification",
      description: "Advanced OCR technology with secure data handling"
    },
    {
      icon: Clock,
      title: "Real-time Results",
      description: "Instant certificate validation with visual indicators"
    },
    {
      icon: Users,
      title: "Multi-Organization",
      description: "Support for universities, companies, and government bodies"
    }
  ];

  const organizations = [
    { icon: GraduationCap, type: "Universities", description: "Verify academic credentials for admissions and partnerships" },
    { icon: Briefcase, type: "Companies", description: "Validate employee educational background efficiently" },
    { icon: Building, type: "Government", description: "Authenticate certificates for official programs and schemes" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Shield className="mr-2 h-6 w-6 text-primary" />
            <span className="font-bold">CertiScan</span>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/features" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Features
              </Link>
              <Link to="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Trusted by Organizations Worldwide
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            Academic Certificate
            <span className="text-primary"> Authenticity</span> Validator
          </h1>
          <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
            Secure, real-time verification of academic credentials for universities, employers, and government organizations.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Verifying
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose CertiScan?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="mx-auto h-12 w-12 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Organizations Section */}
      <section className="bg-secondary/50 px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Built for Your Organization</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {organizations.map((org, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <org.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{org.type}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{org.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16">
        <Card className="mx-auto max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            <CardDescription>
              Join organizations worldwide in securing academic credential verification.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/signup">
              <Button size="lg" className="w-full">
                Create Organization Account
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free setup • Secure verification • Instant results
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95">
        <div className="container px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">CertiScan</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CertiScan. Securing academic credentials worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
