import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Clock, MapPin, Star, Shield, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HomePage = () => {
  const features = [
    {
      icon: <Car className="h-8 w-8" />,
      title: "Betrouwbare Chauffeurs",
      description: "Professionele en ervaren chauffeurs die u veilig naar uw bestemming brengen."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Beschikbaar",
      description: "Dag en nacht beschikbaar voor al uw vervoersbehoeften."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Live Tracking",
      description: "Volg uw rit in real-time en weet precies waar uw taxi zich bevindt."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Top Beoordelingen",
      description: "Hoge klanttevredenheid met gemiddeld 4.8 sterren beoordeling."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Veilig & Verzekerd",
      description: "Alle ritten zijn volledig verzekerd voor uw gemoedsrust."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Eenvoudig Betalen",
      description: "Betaal gemakkelijk met creditcard, PayPal of contant."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4">
              Nederland's #1 Taxi Service
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TaxiToday
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Betrouwbaar, snel en comfortabel vervoer wanneer u het nodig heeft. 
              Boek uw taxi in slechts enkele klikken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  Nu Boeken
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Meer Informatie
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Waarom Kiezen Voor TaxiToday?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ontdek waarom duizenden klanten dagelijks vertrouwen op onze service
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Klaar Om Te Vertrekken?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Boek nu uw taxi en ervaar het verschil van premium vervoer
            </p>
            <Link href="/book">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Uw Reis
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;