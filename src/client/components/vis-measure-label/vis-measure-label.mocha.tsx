/*
 * Copyright 2015-2016 Imply Data, Inc.
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from "chai";
import { shallow } from "enzyme";
import { Datum } from "plywood";
import * as React from "react";
import { DataSeries } from "../../../common/models/data-series/data-series";
import { MeasureFixtures } from "../../../common/models/measure/measure.fixtures";
import { SeriesDerivation } from "../../../common/models/series/series-definition";
import { DEFAULT_FORMAT } from "../../../common/models/series/series-format";
import { Delta } from "../delta/delta";
import { VisMeasureLabel } from "./vis-measure-label";

const dataSeries = new DataSeries(MeasureFixtures.wikiCount(), DEFAULT_FORMAT);

const datum: Datum = { [dataSeries.plywoodExpressionName()]: 10000, [dataSeries.plywoodExpressionName(SeriesDerivation.PREVIOUS)]: 200 };

const renderLabel = (showPrevious = false) => shallow(<VisMeasureLabel
  datum={datum}
  series={dataSeries}
  showPrevious={showPrevious} />);

describe("VisMeasureLabel", () => {
  it("renders measure data on label", () => {
    const label = renderLabel();

    expect(label.find(".measure-title").text()).to.be.eq(dataSeries.measure.title);
    expect(label.find(".measure-value").text()).to.be.eq("10.0 k");
    expect(label.find(".measure-previous-value")).to.have.length(0);
    expect(label.find(Delta)).to.have.length(0);
  });

  it("renders measure data on label with previous series", () => {
    const label = renderLabel(true);

    expect(label.find(".measure-title").text()).to.be.eq(dataSeries.measure.title);
    expect(label.find(".measure-value").text()).to.be.eq("10.0 k");
    expect(label.find(".measure-previous-value").text()).to.be.eq("200.0");
    expect(label.find(Delta)).to.have.length(1);
  });
});
