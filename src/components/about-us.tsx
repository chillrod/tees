import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { InstagramIcon, MailIcon } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export const SobreNos = (props: Props) => {
  return (
    <Dialog modal>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] dark:text-stone-200">
        <DialogHeader>
          <DialogTitle>Sobre nós.</DialogTitle>
          <DialogDescription>
            Conheça o Studio Estampar, uma empresa que nasceu com o propósito de
            transformar a forma como as pessoas se expressam através da moda.
          </DialogDescription>
          <div className="flex flex-col gap-2">
            <img
              src="/studio.svg"
              alt="Studio Estampar"
              className="w-24 h-24 mx-auto mt-6"
            />

            <div>
              <h2 className="font-bold">História:</h2>
              <span className="text-sm opacity-75">
                Criada em 2017 na cidade de Vila Velha, Espirito Santo, a Studio
                Estampar hoje é uma das maiores empresas de estamparia do
                Brasil. Conta com uma equipe de mais de 20 colaboradores, entre
                designers com mais de 30 anos de experiencia e especialistas em
                técnicas de estamparia com mais de 10 anos de mercado.
              </span>
            </div>
            <div>
              <h2 className="font-bold">Clientes:</h2>
              <span className="text-sm opacity-75">
                Atendemos mais de 200 clientes em todo o Brasil, desde pequenos
                empreendedores até grandes marcas de moda.
              </span>
            </div>
            <div>
              <h2 className="font-bold">Entre em contato:</h2>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href="mailto:contato@studioestampar.com.br?subject=Olá Studio Estampar&body=Gostaria de saber mais sobre o Studio Canvas"
                  target="_blank"
                >
                  <MailIcon />
                </a>
                <a
                  href="https://www.tiktok.com/@studioestampar"
                  target="_blank"
                >
                  <img
                    src="tiktok.svg"
                    width="25px"
                    height="25px"
                    alt="TikTok"
                    className="dark:invert"
                  />
                </a>
                <a
                  href="https://www.instagram.com/studioestampar/"
                  target="_blank"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
