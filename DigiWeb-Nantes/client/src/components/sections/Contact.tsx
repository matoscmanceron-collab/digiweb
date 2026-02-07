import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Parlons de votre projet</h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full mb-8"></div>
            <p className="text-lg text-slate-600 mb-8">
              Vous avez une idée ? Un projet de refonte ? N'hésitez pas à nous contacter pour un devis gratuit.
            </p>
            
            <div className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email</h4>
                  <p className="text-slate-600">mail@digiwebfr.studio</p>
                </div>
              </div>
              
            </div>
          </div>

          <div>
            <Card className="shadow-lg border-none bg-slate-50">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean Dupont" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jean@exemple.fr" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre projet..." 
                              className="min-h-[120px] bg-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-secondary hover:text-secondary-foreground text-lg py-6 transition-all duration-300">
                      Envoyer le message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
