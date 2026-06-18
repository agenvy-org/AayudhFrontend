import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center font-sans py-12 px-4">
      <FileQuestion className="w-16 h-16 text-slate-350 mb-4" />
      <h1 className="font-serif text-5xl font-black text-brand-navy">404</h1>
      <h2 className="text-lg font-bold text-slate-700 mt-2">पेज नहीं मिला</h2>
      <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
        क्षमा करें, आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है या हटा दिया गया है।
      </p>
      <Link href="/" className="mt-6">
        <Button className="bg-brand-navy hover:bg-brand-navy-light text-white text-xs px-6 py-2.5 rounded-full font-bold">
          मुख्य पृष्ठ पर जाएं
        </Button>
      </Link>
    </div>
  );
}
