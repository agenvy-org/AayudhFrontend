'use client';

import React, { useState } from 'react';
import { MessageCircle, Send, User, Sparkles } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'यूजर', 
      text: newComment.trim(),
      date: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-12 pt-8 font-sans border-t border-slate-100 relative">
      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brand-purple/0 via-brand-purple to-brand-purple/0 opacity-30 rounded-full"></div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple shadow-inner">
          <MessageCircle className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
          टिप्पणियाँ <span className="text-slate-400 font-medium text-xl">({comments.length})</span>
        </h3>
      </div>
      
      {/* Comment Form Card */}
      <div className={`relative bg-gradient-to-b from-white to-slate-50/50 rounded-3xl p-1 transition-all duration-500 ${isFocused ? 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] -translate-y-0.5' : 'shadow-sm'}`}>
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-purple/20 via-blue-500/20 to-brand-purple/20 opacity-0 blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : ''} -z-10`}></div>
        <div className={`bg-white rounded-[22px] p-5 sm:p-6 border transition-colors duration-300 ${isFocused ? 'border-brand-purple/30' : 'border-slate-200'}`}>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border-2 border-white shadow-md ring-1 ring-slate-100">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-grow">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="इस खबर के बारे में अपने विचार साझा करें..."
                  className="w-full min-h-[90px] p-0 bg-transparent border-0 focus:ring-0 resize-none text-base text-slate-800 placeholder:text-slate-400 font-medium"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100/80">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300">
                    <span className={newComment.length > 0 ? 'text-brand-purple' : 'text-slate-400'}>
                      {newComment.length}
                    </span>
                    <span className="text-slate-400">अक्षर</span>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!newComment.trim()}
                    className={`relative overflow-hidden flex items-center gap-2.5 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 group ${
                      newComment.trim() 
                      ? 'bg-gradient-to-r from-brand-navy to-brand-purple text-white shadow-lg shadow-brand-purple/20 hover:shadow-xl hover:shadow-brand-purple/30 hover:-translate-y-1' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {newComment.trim() && (
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                    )}
                    <span className="relative z-10">पोस्ट करें</span>
                    <Send className={`w-4 h-4 relative z-10 ${newComment.trim() ? 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="mt-10 space-y-5">
          {comments.map((comment, index) => (
            <div 
              key={comment.id} 
              className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand-purple rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-navy to-brand-purple text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md ring-2 ring-white">
                {comment.author.charAt(0)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-base text-slate-900">{comment.author}</span>
                  <span className="text-[11px] text-slate-500 font-bold bg-slate-100/80 px-3 py-1 rounded-full uppercase tracking-wider">{comment.date}</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 relative overflow-hidden text-center py-16 bg-gradient-to-b from-slate-50/50 to-slate-100/30 rounded-3xl border border-slate-200/60 border-dashed">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
          <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-slate-100 ring-4 ring-slate-50">
            <Sparkles className="w-8 h-8 text-brand-purple/60" />
          </div>
          <p className="relative z-10 text-slate-500 font-bold text-lg">अभी तक कोई टिप्पणी नहीं है।<br/><span className="font-medium text-base text-slate-400 mt-1 block">पहली टिप्पणी करने वाले बनें!</span></p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
