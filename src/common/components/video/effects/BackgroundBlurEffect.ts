 
import BaseGLEffect from '@/common/components/video/effects/BaseGLEffect';
import {
  EffectFrameContext,
  EffectInit,
} from '@/common/components/video/effects/Effect';
import fragmentShaderSource from '@/common/components/video/effects/shaders/BackgroundBlur.frag?raw';
import vertexShaderSource from '@/common/components/video/effects/shaders/DefaultVert.vert?raw';
import {Tracklet} from '@/common/tracker/Tracker';
import invariant from 'invariant';
import {CanvasForm} from 'pts';

export default class BackgroundBlurEffect extends BaseGLEffect {
  private _blurRadius: number = 3;

  constructor() {
    super(3);

    this.vertexShaderSource = vertexShaderSource;
    this.fragmentShaderSource = fragmentShaderSource;
  }

  protected setupUniforms(
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    init: EffectInit,
  ): void {
    super.setupUniforms(gl, program, init);

    gl.uniform1i(
      gl.getUniformLocation(program, 'uBlurRadius'),
      this._blurRadius,
    );
  }

  apply(form: CanvasForm, context: EffectFrameContext, _tracklets: Tracklet[]) {
    const gl = this._gl;
    const program = this._program;

    if (!program) {
      return;
    }
    invariant(gl !== null, 'WebGL2 context is required');

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const blurRadius = [3, 6, 12][this.variant % 3];
    gl.uniform1i(gl.getUniformLocation(program, 'uBlurRadius'), blurRadius);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._frameTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      context.width,
      context.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      context.frame,
    );

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    const ctx = form.ctx;
    invariant(this._canvas !== null, 'canvas is required');
    ctx.drawImage(this._canvas, 0, 0);
  }
}
