import { Link } from '@remix-run/react';
import { CloudOff } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/shared/config/routes';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { Button } from './button';

interface ShowErrorProps {
  message?: string;
  code: number;
}

const ShowError: React.FC<ShowErrorProps> = ({ message, code }) => {
  const { t } = useTranslation();
  const getConfig = (errorCode: number) => {
    switch (errorCode) {
      case 404:
        return {
          title: t('app.message.error.404.title'),
          message: t('app.message.error.404.message'),
        };
      case 500:
        return {
          title: t('app.message.error.500.title'),
          message: t('app.message.error.500.message'),
        };
      case 503:
        return {
          title: t('app.message.error.503.title'),
          message: t('app.message.error.503.message'),
        };
      case 401:
        return {
          title: t('app.message.error.401.title'),
          message: t('app.message.error.401.message'),
        };
      default:
        return {
          title: t('app.message.error.unknown.title'),
          message: t('app.message.error.unknown.message'),
        };
    }
  };

  const config = getConfig(code);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground items-center justify-center">
      <Card className="w-full max-w-md flex ">
        <CardHeader>
          <CardTitle className="text-center">{config.title}</CardTitle>
          <CardDescription className="text-center">{message || config.message}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center flex-col gap-4">
          <CloudOff className="w-30 h-30" />
          <span>{code}</span>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to={ROUTES.home}>{t('common.action.goToHome')}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShowError;
