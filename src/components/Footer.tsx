import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";

const locations: Record<string, { address: string; phone: string }> = {
  Nashik: {
    address: "4th Floor, Roongta Supremus, Near Chandak Circle, Tilak Colony, Mumbai Naka, Nashik 422 002",
    phone: "+91-9623230512",
  },
  Thane: {
    address: "Thane Center Address, Thane West, Maharashtra",
    phone: "+91-9623230512",
  },
  Pune: {
    address: "Pune Center Address, Pune, Maharashtra",
    phone: "+91-9623230512",
  },
};

export default function Footer() {
  const [activeLocation, setActiveLocation] = useState("Nashik");
  const loc = locations[activeLocation];

  return (
    <footer id="footer" className="bg-ayurveda-brown text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Home", "About Us", "Diseases", "Treatments", "Blogs", "Contact"].map((l) => (
                <li key={l} className="hover:text-primary-foreground cursor-pointer transition-colors">{l}</li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Treatments</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Suprajanan", "Panchakarma", "Treatment Methodology", "Factory – Own Pharmacy"].map((l) => (
                <li key={l} className="hover:text-primary-foreground cursor-pointer transition-colors">{l}</li>
              ))}
            </ul>
          </div>

          {/* Diseases */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Diseases</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Male Infertility", "Female Infertility", "PCOD", "Uterine Disorders"].map((l) => (
                <li key={l} className="hover:text-primary-foreground cursor-pointer transition-colors">{l}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>

            <div className="flex gap-2 mb-4">
              {Object.keys(locations).map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveLocation(city)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    activeLocation === city
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="space-y-3 text-sm text-primary-foreground/70">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                {loc.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                {loc.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                rohatayurved@gmail.com
              </p>
            </div>

            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
          <p>© 2025 All Rights Reserved By Rohati Ayurved</p>
          <div className="flex gap-4">
            <span className="hover:text-primary-foreground cursor-pointer">Terms and Conditions</span>
            <span className="hover:text-primary-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary-foreground cursor-pointer">Payment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
