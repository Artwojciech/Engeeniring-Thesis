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

export default function SignInPage() {
  const {login} = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      toast.error("fill in all boxes");
      return;
    }

    setIsLoading(true);

    try {
      await login(username, password);
      toast.success("succesfully logged in");
      navigate("/"); 
    } catch (err: unknown) {
      toast.error("incorrect username or password");
      setUsername("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-homeside">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Card className="bg-navbg border-footerbg">
          <CardHeader className="-mb-3">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="mt-4">
              Provide login details to sign in
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
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                className="w-full z-20"
                onClick={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? "Logging..." : "Sign In"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              You don't have an account yet?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
