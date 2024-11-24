import { useEffect, useState } from 'react';
import { File } from '../../../types/file.type';
import { getImagePath } from '../../../utils';

type CertificateItemProps = {
  certificate: File;
}

function CertificateItem({certificate}: CertificateItemProps):JSX.Element {
  const [imagePath, setImagePath] = useState<string>('img/content/certificates-and-diplomas/certificate-2.webp');

  useEffect(() => {
    if (certificate) {
      setImagePath(getImagePath(certificate));
    }
  }, [certificate]);

  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card">
        <div className="certificate-card__image">
          <picture>
            <source type="image/webp" srcSet={imagePath} /><img src={imagePath} srcSet={imagePath} width="294" height="360" alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий" />
          </picture>
        </div>
        <div className="certificate-card__buttons">
          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg><span>Изменить</span>
          </button>
          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg><span>Сохранить</span>
          </button>
          <div className="certificate-card__controls">
            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </button>
            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CertificateItem;
