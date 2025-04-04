import {
  CheckCircle,
  Database,
  HeartHandshake,
  Lock,
  LockOpen,
  Search,
  Shield,
  Upload,
  View,
  Zap,
} from "lucide-react";

export const user_features = [
  {
    title: "Secure Storage",
    description:
      "Patient records are encrypted and stored securely on a central Authorised DB, ensuring data integrity and privacy.",
    icon: <Shield className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
  {
    title: "Immutable Records",
    description:
      "Once stored, records cannot be altered, providing a reliable audit trail for all medical data.",
    icon: <Database className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
  {
    title: "Easy Access",
    description:
      "Quick and efficient access to patient records while maintaining strict security protocols.",
    icon: <Search className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
];

export const hospital_features = [
  {
    title: "Enhanced Security",
    description:
      "Advanced encryption ensures patient data remains confidential and protected from unauthorized access.",
    icon: <Lock className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
  {
    title: "Improved Efficiency",
    description:
      "Streamlined workflows and instant access to patient records save valuable time in healthcare delivery.",
    icon: <Zap className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
  {
    title: "Realiable Data",
    description:
      "Reliable Medical Records From Patients from other Healthcare Providers",
    icon: <CheckCircle className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
  {
    title: "Co-Operation Among Healthcare Providers",
    description: "Ensures Cooperation among different healthcare providers",
    icon: <HeartHandshake className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
];
export const doctor_options = [
  {
    title: "Request User Permission",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet officia magni repellendus reprehenderit corporis veritatis aperiam mollitia sit laboriosam dolorem incidunt debitis ab iste laudantium voluptates doloribus nihil, qui eaque.",
    icon: <LockOpen className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
  {
    title: "Upload Medical Records",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet officia magni repellendus reprehenderit corporis veritatis aperiam mollitia sit laboriosam dolorem incidunt debitis ab iste laudantium voluptates doloribus nihil, qui eaque.",
    icon: <Upload className="h-8 w-8 text-indigo-500" />,
    link: "doctor/upload",
  },
  {
    title: "View Patient Record",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet officia magni repellendus reprehenderit corporis veritatis aperiam mollitia sit laboriosam dolorem incidunt debitis ab iste laudantium voluptates doloribus nihil, qui eaque.",
    icon: <View className="h-8 w-8 text-indigo-500" />,
    link: "",
  },
];
