
import { useState } from "react";
import { ArrowLeft, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

interface ContactProps {
  onBack: () => void;
  onHomeClick: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

const Contact = ({ onBack, onHomeClick, onSearchClick, onCartClick, cartCount }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailBody = `Name: ${formData.name}\n\nMessage:\n${formData.message}`;

    if (isMobile()) {
      const mailtoLink = `mailto:ridoan.zisan@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    } else {
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=ridoan.zisan@gmail.com&su=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailLink, '_blank');
    }

    // Reset form
    setFormData({
      name: "",
      subject: "",
      message: ""
    });

    setIsSubmitting(false);
    
    toast({
      title: isMobile() ? "Email app opened!" : "Gmail opened successfully!",
      description: isMobile() 
        ? "Please send your message from your email app." 
        : "Please send your message from the opened Gmail compose window.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-extralight tracking-wide">Contact</h1>
          <div className="w-8" />
        </div>
      </header>

      {/* Contact Form */}
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white hover:bg-gray-800 py-3"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    {isMobile() ? 'Opening Email App...' : 'Opening Gmail...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </div>
                )}
              </Button>
            </div>
          </form>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open('tel:+8801712525910', '_self')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call +880 1712 525910
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        cartCount={cartCount}
        onHomeClick={onHomeClick}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onContactClick={() => {}}
        activeTab="contact"
      />
    </div>
  );
};

export default Contact;
