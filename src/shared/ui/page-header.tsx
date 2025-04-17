import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { useNavigate } from '@remix-run/react';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
  hasBackButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className,
  children,
  hasBackButton = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <header className={`flex flex-col ${className}`}>
      <div className="flex flex-row items-center justify-between flex-wrap gap-1">
        <div className="flex flex-row items-center gap-2">
          {hasBackButton && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                  <ArrowLeftIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t('common.action.back')}</TooltipContent>
            </Tooltip>
          )}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{t(title)}</h1>
            {subtitle && <h2 className="text-lg text-gray-600">{t(subtitle)}</h2>}
          </div>
        </div>
        {children}
      </div>
    </header>
  );
};

export default PageHeader;
