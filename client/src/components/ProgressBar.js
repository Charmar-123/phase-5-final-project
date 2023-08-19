import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div style={{ width: '100%', height: '20px', backgroundColor: '#eee' }}>
      <motion.div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: 'blue',
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 2, ease: 'linear' }}
      />
    </div>
  );
};

export default ProgressBar;
