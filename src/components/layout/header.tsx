'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  Home,
  Info,
  Search,
  Users,
  LayoutDashboard,
  Coins,
  MessageSquare,
  UserCircle,
  LogIn,
} from 'lucide-react';
import { CURRENT_USER, CURRENT_USER_CREDITS } from '@/lib/mock-data';

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '프로젝트 소개', href: '/about', icon: Info },
  { name: '멘토링 찾기', href: '/explore', icon: Search },
  { name: '커뮤니티', href: '/community', icon: MessageSquare },
  { name: '내 활동', href: '/dashboard', icon: LayoutDashboard },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            멘
          </div>
          <span className="hidden font-bold text-lg sm:inline-block">
            멘토링 뱅크
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Credits Badge */}
          <Link href="/dashboard" className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
            <Coins className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {CURRENT_USER_CREDITS.balance} 크레딧
            </span>
          </Link>

          {/* User Avatar */}
          <Link href="/dashboard" className="hidden sm:block">
            <Avatar className="h-8 w-8 border-2 border-primary/20">
              <AvatarImage src={CURRENT_USER.profileImage} alt={CURRENT_USER.name} />
              <AvatarFallback>{CURRENT_USER.name[0]}</AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-6 mt-6">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={CURRENT_USER.profileImage} alt={CURRENT_USER.name} />
                    <AvatarFallback>{CURRENT_USER.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{CURRENT_USER.name}</p>
                    <div className="flex items-center space-x-1 text-primary">
                      <Coins className="h-3 w-3" />
                      <span className="text-sm">{CURRENT_USER_CREDITS.balance} 크레딧</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>

                {/* Actions */}
                <div className="pt-4 border-t">
                  <Button className="w-full" asChild>
                    <Link href="/register-talent" onClick={() => setIsOpen(false)}>
                      재능 등록하기
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
