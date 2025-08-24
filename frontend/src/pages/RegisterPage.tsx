import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export default function SignUpPage() {
  const {register} = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const passwordValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSignUp = async () => {
    if (!username || !email || !birthDate || !password || !confirmPassword) {
      toast.error("fill in all boxes");
      return;
    }
    if (!passwordValid) {
      toast.error("password does not meet requirements");
      return;
    }
    if (!passwordsMatch) {
      toast.error("passwords must match");
      return;
    }

    setIsLoading(true);

    try {
    await register(username, email, birthDate.toISOString(), password);
    toast.success("account created successfully!");
    navigate("/");
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message); 
    } else {
      toast.error("failed to create account");
    }
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-homeside">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Card className="bg-navbg border-footerbg">
          <CardHeader className="-mb-3">
            <CardTitle className="text-2xl text-center">Sign up</CardTitle>
            <CardDescription className="mt-4">
              Fill the form to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-footerbg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-footerbg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">birth date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center justify-start text-left font-thin text-[1rem] border border-footerbg hover:bg-homeside hover:text-accent-foreground rounded-md h-9 px-3 py-2"
                    >       {/*ten classname wyzej to skopiowana klasa button ghost, button z shadcn nie dziala bo pisze ze musialby uzywac forwardref?? ale ono juz jest depriciated, niespojnosc biblioteki*/}
                      {birthDate ? format(birthDate, "yyyy-MM-dd") : "pick a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-20">
                    <Calendar
                      mode="single"
                      selected={birthDate}
                      onSelect={setBirthDate}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 border-footerbg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-[1.875rem] text-footerbg"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                <div className="flex items-center gap-1 text-xs mt-1">
                  {passwordValid ? (
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-footerbg">
                    the password must have at least 8 letters, one capital letter and one number
                  </span>
                </div>
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="confirmPassword">confirm password</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="*********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10 border-footerbg"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-[1.875rem] text-footerbg"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                {!passwordsMatch && confirmPassword.length > 0 && (
                  <span className="text-xs text-red-500 mt-1">
                    the passwords must be the same
                  </span>
                )}
              </div>
              <Button
                className="w-full z-20 cursor-pointer"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="underline underline-offset-4">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
