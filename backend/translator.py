from fairseq.models.transformer import TransformerModelBase
import sentencepiece as spm
import torch


class Translator:
    def __init__(self, model_path, tokenizer_ja_path, tokenizer_en_path):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = TransformerModelBase.from_pretrained(model_path)
        self.model = self.model.to(self.device)
        self.model.eval()

        ja_sp, en_sp = spm.SentencePieceProcessor(), spm.SentencePieceProcessor()
        ja_sp.Load(tokenizer_ja_path)
        en_sp.Load(tokenizer_en_path)
        self.ja_sp = ja_sp
        self.en_sp = en_sp

    def translate(self, src_text, beam=5):
        src_text = ' '.join(self.ja_sp.encode_as_pieces(src_text))

        with torch.no_grad():
            translation = self.model.translate(src_text, beam=beam)

        translation = self.en_sp.decode_pieces(translation.split())
        return translation
