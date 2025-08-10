"use client"

import { useLanguage } from "../context/LanguageContext"
import "./SizeGuide.css"

const SizeGuide = () => {
  const { t } = useLanguage()

  const womenSizeChart = [
    { size: "XS", bust: "30-32", waist: "23-25", hips: "33-35" },
    { size: "S", bust: "32-34", waist: "25-27", hips: "35-37" },
    { size: "M", bust: "34-36", waist: "27-29", hips: "37-39" },
    { size: "L", bust: "36-38", waist: "29-31", hips: "39-41" },
    { size: "XL", bust: "38-40", waist: "31-33", hips: "41-43" },
    { size: "XXL", bust: "40-42", waist: "33-35", hips: "43-45" },
  ]

  return (
    <div className="size-guide-page">
      <div className="size-guide-container">
        <h1>{t("sizeGuide")}</h1>
        <p className="intro-text">{t("sizeGuideIntro")}</p>

        <section className="size-chart-section">
          <h2>{t("womenApparel")}</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>{t("size")}</th>
                  <th>
                    {t("bust")} ({t("inches")})
                  </th>
                  <th>
                    {t("waist")} ({t("inches")})
                  </th>
                  <th>
                    {t("hips")} ({t("inches")})
                  </th>
                </tr>
              </thead>
              <tbody>
                {womenSizeChart.map((row) => (
                  <tr key={row.size}>
                    <td>{row.size}</td>
                    <td>{row.bust}</td>
                    <td>{row.waist}</td>
                    <td>{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="size-chart-section">
          
          <div className="table-responsive">
            <table>
             
              
            </table>
          </div>
        </section>

        <section className="how-to-measure-section">
          <h2>{t("howToMeasure")}</h2>
          <div className="measurement-steps">
            <div className="step-item">
              <h3>{t("bustMeasurement")}</h3>
              <p>{t("bustMeasureDesc")}</p>
            </div>
            <div className="step-item">
              <h3>{t("waistMeasurement")}</h3>
              <p>{t("waistMeasureDesc")}</p>
            </div>
            <div className="step-item">
              <h3>{t("hipsMeasurement")}</h3>
              <p>{t("hipsMeasureDesc")}</p>
            </div>
            <div className="step-item">
              <h3>{t("chestMeasurement")}</h3>
              <p>{t("chestMeasureDesc")}</p>
            </div>
          </div>
        </section>

        <p className="disclaimer-text">{t("sizeGuideDisclaimer")}</p>
      </div>
    </div>
  )
}

export default SizeGuide
