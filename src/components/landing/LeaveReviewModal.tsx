import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useLogistics } from '../../context/LogisticsContext';
import { Star, Send, Building2, UserCheck, MessageSquare } from 'lucide-react';

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaveReviewModal: React.FC<LeaveReviewModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useLogistics();
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [serviceUsed, setServiceUsed] = useState('Container Unloading & Port Drayage');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    showToast({
      type: 'success',
      title: 'Review Submitted',
      message: `Thank you, ${name}! Your verified ${rating}-star feedback has been recorded.`
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Leave a Customer Review"
      subtitle="Share your operational experience with Global Freight Solutions container logistics."
      maxWidth="max-w-lg"
      footer={
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="leave-review-form"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Verified Review</span>
          </button>
        </div>
      }
    >
      <form id="leave-review-form" onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Rating Stars */}
        <div>
          <label className="font-semibold text-slate-700 block mb-1.5">Overall Satisfaction Score</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition-transform cursor-pointer"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 font-bold text-slate-800 text-sm">{rating}.0 / 5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Your Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. David Ross"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Company / Entity</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Pacific Cargo Logistics"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Service Category Utilized</label>
          <select
            value={serviceUsed}
            onChange={(e) => setServiceUsed(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
          >
            <option value="Container Unloading & Port Drayage">Container Unloading & Port Drayage</option>
            <option value="Ocean Freight FCL Container">Ocean Freight FCL Container</option>
            <option value="Intercontinental Air Cargo">Intercontinental Air Cargo</option>
            <option value="Temperature-Controlled Cold Chain">Temperature-Controlled Cold Chain</option>
            <option value="Customs Manifest Clearance">Customs Manifest Clearance</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Your Operational Review *</label>
          <textarea
            rows={3}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe transit timeliness, container condition upon arrival, discharge turnaround..."
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
          />
        </div>
      </form>
    </Modal>
  );
};
