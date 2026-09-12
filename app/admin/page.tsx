'use client';

import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  LayoutDashboard,
  Mail,
  Search,
  Lock,
  LogOut,
  Loader2,
  RefreshCw,
} from 'lucide-react';

import { Container, Badge } from '@/components/site/section';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { supabase } from '@/lib/supabase-client';

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');

  /* =========================================================
     LOAD MESSAGES
  ========================================================= */

  const loadMessages = async (): Promise<boolean> => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setMessages([]);
      setLoading(false);
      return false;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      console.log('Admin messages:', data);
      console.log('Admin message error:', fetchError);

      if (fetchError) {
        console.error(
          'Admin message loading error:',
          fetchError,
        );

        setMessages([]);
        setError(fetchError.message);
        setLoading(false);

        return false;
      }

      setMessages((data as Message[]) ?? []);
      setLoading(false);

      return true;
    } catch (err) {
      console.error(
        'Unexpected admin message error:',
        err,
      );

      setMessages([]);
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load messages.',
      );
      setLoading(false);

      return false;
    }
  };

  /* =========================================================
     VERIFY ADMIN
  ========================================================= */

  const verifyAdmin = async (
    currentSession: Session | null,
  ): Promise<boolean> => {
    if (!supabase || !currentSession?.user?.email) {
      return false;
    }

    const userEmail =
      currentSession.user.email.trim().toLowerCase();

    try {
      const { data: admin, error: adminError } =
        await supabase
          .from('admin_users')
          .select('email')
          .ilike('email', userEmail)
          .maybeSingle();

      if (adminError) {
        console.error(
          'Admin verification error:',
          adminError,
        );

        setError(
          `Admin verification failed: ${adminError.message}`,
        );

        return false;
      }

      return !!admin;
    } catch (err) {
      console.error(
        'Unexpected admin verification error:',
        err,
      );

      setError(
        err instanceof Error
          ? `Admin verification failed: ${err.message}`
          : 'Admin verification failed.',
      );

      return false;
    }
  };

  /* =========================================================
     INITIAL SESSION
  ========================================================= */

  useEffect(() => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    let mounted = true;

    const initialize = async () => {
      setLoading(true);
      setError('');

      try {
        const {
          data: { session: currentSession },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (sessionError) {
          console.error(
            'Session initialization error:',
            sessionError,
          );

          setSession(null);
          setMessages([]);
          setError(sessionError.message);
          setLoading(false);

          return;
        }

        if (!currentSession) {
          setSession(null);
          setMessages([]);
          setLoading(false);

          return;
        }

        const isAdmin =
          await verifyAdmin(currentSession);

        if (!mounted) return;

        if (!isAdmin) {
          await supabase.auth.signOut();

          if (!mounted) return;

          setSession(null);
          setMessages([]);
          setError('Access denied.');
          setLoading(false);

          return;
        }

        /*
         * The user is authenticated and authorized.
         * Show the dashboard first, then load the messages.
         */
        setSession(currentSession);
        setLoading(false);

        await loadMessages();
      } catch (err) {
        console.error(
          'Admin initialization error:',
          err,
        );

        if (!mounted) return;

        setSession(null);
        setMessages([]);
        setLoading(false);

        setError(
          err instanceof Error
            ? err.message
            : 'Unable to initialize admin dashboard.',
        );
      }
    };

    initialize();

    /*
     * IMPORTANT:
     * Keep this callback synchronous.
     *
     * Do not call Supabase async methods from inside
     * onAuthStateChange.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (!mounted) return;

        if (!currentSession) {
          setSession(null);
          setMessages([]);
          setQuery('');
          setError('');
          setLoading(false);
          setLoginLoading(false);

          return;
        }

        /*
         * We only synchronize the local React session here.
         *
         * Authorization is handled by initialize() and
         * handleLogin(), outside this callback.
         */
        setSession(currentSession);
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }

    setLoginLoading(true);
    setError('');

    try {
      const {
        data,
        error: loginError,
      } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (loginError) {
        console.error(
          'Admin login error:',
          loginError,
        );

        setError(loginError.message);
        setLoginLoading(false);

        return;
      }

      if (!data.session) {
        setError(
          'Login succeeded but no session was returned.',
        );

        setLoginLoading(false);

        return;
      }

      /*
       * IMPORTANT:
       * Do NOT call setSession(), auth.setSession(),
       * loadMessages(), or other async Supabase methods
       * from onAuthStateChange.
       *
       * We are already outside that callback here, so it
       * is safe to verify authorization and load data.
       */

      const isAdmin = await verifyAdmin(data.session);

      if (!isAdmin) {
        await supabase.auth.signOut();

        setSession(null);
        setMessages([]);

        setError(
          'Access denied. This account is not authorized for the admin dashboard.',
        );

        setLoginLoading(false);

        return;
      }

      /*
       * Show the dashboard immediately after authorization.
       */
      setSession(data.session);

      setEmail('');
      setPassword('');
      setError('');

      setLoginLoading(false);

      /*
       * Load messages separately.
       * Any failure will now appear inside the dashboard
       * instead of leaving the login button stuck on
       * "Signing in...".
       */
      await loadMessages();
    } catch (err) {
      console.error(
        'Unexpected admin login error:',
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to sign in.',
      );

      setLoginLoading(false);
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    if (!supabase) return;

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error(
        'Admin logout error:',
        err,
      );
    }

    setSession(null);
    setMessages([]);
    setQuery('');
    setError('');
    setLoading(false);
    setLoginLoading(false);
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredMessages = messages.filter(
    (message) => {
      const search =
        query.trim().toLowerCase();

      if (!search) {
        return true;
      }

      return (
        message.name
          .toLowerCase()
          .includes(search) ||
        message.email
          .toLowerCase()
          .includes(search) ||
        message.subject
          .toLowerCase()
          .includes(search) ||
        message.message
          .toLowerCase()
          .includes(search)
      );
    },
  );

  /* =========================================================
     LOGIN SCREEN
  ========================================================= */

  if (!session) {
    return (
      <div className="pt-24">
        <section className="relative overflow-hidden py-12">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute inset-0 grid-bg opacity-30" />
          </div>

          <Container>
            <div className="mx-auto max-w-md">
              <Card className="glass border-white/5 bg-transparent p-8">
                <div className="mb-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                    <Lock className="h-5 w-5 text-cyan-300" />
                  </div>

                  <div className="mt-4">
                    <Badge>Admin</Badge>
                  </div>

                  <h1 className="mt-4 text-2xl font-bold text-white">
                    Admin Login
                  </h1>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Sign in to access the Photonic Labs contact inbox.
                  </p>
                </div>

                <form
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="admin-email"
                      className="text-xs uppercase tracking-wider text-cyan-300/80"
                    >
                      Email
                    </label>

                    <Input
                      id="admin-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value,
                        )
                      }
                      className="glass border-white/10 bg-transparent"
                      placeholder="admin@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="admin-password"
                      className="text-xs uppercase tracking-wider text-cyan-300/80"
                    >
                      Password
                    </label>

                    <Input
                      id="admin-password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value,
                        )
                      }
                      className="glass border-white/10 bg-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  {error && (
                    <div className="rounded-lg border border-red-400/20 bg-red-500/5 px-4 py-3 text-sm leading-relaxed text-red-300">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white btn-glow"
                  >
                    {loginLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}

                    {loginLoading
                      ? 'Signing in...'
                      : 'Sign in'}
                  </Button>
                </form>
              </Card>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  /* =========================================================
     ADMIN INBOX
  ========================================================= */

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>

        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge>
                  <Lock className="mr-1 h-3 w-3" />
                  Authenticated
                </Badge>

                <Badge className="border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                  Admin
                </Badge>
              </div>

              <h1 className="mt-4 flex items-center gap-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
                <LayoutDashboard className="h-8 w-8 text-cyan-300" />
                Contact Inbox
              </h1>

              <p className="mt-3 text-sm text-muted-foreground">
                Messages submitted through the Photonic Labs contact form.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={loadMessages}
                disabled={loading}
                className="glass border-white/10"
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${
                    loading
                      ? 'animate-spin'
                      : ''
                  }`}
                />
                Refresh
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="glass border-white/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <Card className="glass border-white/5 bg-transparent p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-300" />

                <span className="font-semibold text-white">
                  Messages
                </span>

                <Badge className="border-white/10 text-muted-foreground">
                  {messages.length}
                </Badge>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target.value,
                    )
                  }
                  placeholder="Search messages..."
                  className="glass border-white/10 bg-transparent pl-9"
                />
              </div>
            </div>

            {error && (
              <div className="mb-5 rounded-lg border border-red-400/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex min-h-40 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
                {messages.length === 0
                  ? 'No messages yet.'
                  : 'No messages match your search.'}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMessages.map(
                  (message) => (
                    <div
                      key={message.id}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-cyan-400/20"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-white">
                              {message.name}
                            </span>

                            <span className="text-xs font-mono text-muted-foreground">
                              {message.email}
                            </span>

                            <Badge>
                              {message.subject}
                            </Badge>
                          </div>

                          <span className="text-xs font-mono text-muted-foreground">
                            {new Date(
                              message.created_at,
                            ).toLocaleString()}
                          </span>
                        </div>

                        <div className="rounded-lg border border-white/5 bg-black/10 p-4">
                          <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                            {message.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </Card>
        </Container>
      </section>
    </div>
  );
}